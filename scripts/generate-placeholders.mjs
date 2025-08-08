import sharp from "sharp";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { createJiti } from "jiti";

// --- Configuración de Rutas ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const photosFilePath = path.join(projectRoot, "src", "data", "photos.ts");

// --- Lógica del Script ---

/**
 * Usa jiti para importar el archivo de datos de TypeScript sin necesidad de compilarlo primero.
 */
async function getPhotosData() {
  const jiti = createJiti(projectRoot);
  const { photos } = await jiti("./src/data/photos.ts");
  return photos;
}

/**
 * Procesa una sola imagen para crear su placeholder.
 * @param {object} photo - El objeto de la foto del archivo de datos.
 * @returns {Promise<object>} El objeto de la foto actualizado con placeholderSrc.
 */
async function processImage(photo) {
  try {
    const sourcePath = path.join(publicDir, photo.src);
    if (!(await fs.pathExists(sourcePath))) {
      console.warn(`- ⚠️  Advertencia: No se encontró la imagen fuente, se omitirá: ${photo.src}`);
      return { ...photo, placeholderSrc: "" };
    }

    const placeholderDir = path.join(publicDir, "placeholders", photo.category);
    const placeholderFileName = path.basename(photo.src);
    const placeholderDestPath = path.join(placeholderDir, placeholderFileName);

    await fs.ensureDir(placeholderDir);

    // Usa sharp para redimensionar, aplicar blur y comprimir la imagen.
    await sharp(sourcePath)
      .resize(100) // Redimensiona a 50px de ancho, manteniendo la proporción.
      .blur(1.5) // Aplica un desenfoque suave.
      .jpeg({ quality: 80 }) // Comprime la imagen.
      .toFile(placeholderDestPath);

    const placeholderSrc = `placeholders/${photo.category}/${placeholderFileName}`.replace(/\\/g, "/");
    console.log(`+ ✔️  Placeholder generado para: ${photo.src}`);

    return { ...photo, placeholderSrc };
  } catch (error) {
    console.error(`- ❌ Error procesando ${photo.src}:`, error);
    return { ...photo, placeholderSrc: "" };
  }
}

/**
 * Genera el contenido del nuevo archivo photos.ts, preservando la estructura.
 * @param {Array<object>} photos - El array de fotos actualizado.
 * @returns {string} El contenido completo del archivo para escribir.
 */
function generateNewFileContent(photos) {
  const photosByCategory = photos.reduce((acc, photo) => {
    (acc[photo.category] = acc[photo.category] || []).push(photo);
    return acc;
  }, {});

  const formatObject = (obj) => {
    const entries = Object.entries(obj)
      .map(([key, value]) => {
        const formattedValue = typeof value === "string" ? `"${value}"` : value;
        return `    ${key}: ${formattedValue}`;
      })
      .join(",\n");
    return `  {\n${entries}\n  }`;
  };

  let photosArrayContent = Object.entries(photosByCategory)
    .map(([category, photoList]) => {
      const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
      const photosString = photoList.map(formatObject).join(",\n");
      return `  // ${categoryTitle}\n${photosString}`;
    })
    .join(",\n\n");

  return `export interface Photo {
  id: number;
  src: string;
  placeholderSrc: string;
  title: string;
  category: string;
  width: number;
  height: number;
}

export const photos: Photo[] = [
${photosArrayContent}
];
`;
}

/**
 * Función principal que orquesta todo el proceso.
 */
async function main() {
  console.log("🚀 Iniciando la generación de placeholders...");

  const originalPhotos = await getPhotosData();
  const updatedPhotos = await Promise.all(originalPhotos.map(processImage));
  const newFileContent = generateNewFileContent(updatedPhotos);

  await fs.writeFile(photosFilePath, newFileContent);

  console.log("\n✅ ¡Proceso completado!");
  console.log(`✅ El archivo ${photosFilePath} ha sido actualizado con las rutas de los placeholders.`);
}

main().catch(console.error);
