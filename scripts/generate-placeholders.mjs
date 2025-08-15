import sharp from "sharp";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

// --- Configuración de Rutas ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const sourcePhotosPath = path.join(projectRoot, "src", "data", "photos-base.json"); // Fuente de datos
const generatedPhotosPath = path.join(projectRoot, "src", "data", "photos.json"); // Archivo generado

// --- Configuración de Placeholders ---
const PLACEHOLDER_WIDTH = 24;
const PLACEHOLDER_BLUR = 2;
const PLACEHOLDER_WEBP_QUALITY = 75;

// --- Lógica del Script ---

/**
 * Lee los datos de las fotos desde el archivo JSON base.
 */
async function getPhotosData() {
  const photos = await fs.readJson(sourcePhotosPath);
  return photos;
}

/**
 * Procesa una sola imagen para crear su placeholder.
 * @param {object} photo - El objeto de la foto del archivo de datos.
 * @param {number} id - El ID consecutivo para asignar a la foto.
 * @returns {Promise<object>} El objeto de la foto actualizado con rutas WebP y datos de placeholder.
 */
async function processImage(photo, id) {
  try {
    // La fuente ahora es un archivo .webp
    const sourcePath = path.join(publicDir, photo.src); // e.g., public/img/documental/foto1.webp
    if (!(await fs.pathExists(sourcePath))) {
      console.warn(`- ⚠️  Advertencia: No se encontró la imagen fuente, se omitirá: ${photo.src}`);
      return { ...photo, id, width: 1, height: 1, placeholderSrc: "" };
    }

    // --- Definir rutas de destino para el placeholder ---
    const placeholderFileName = path.basename(photo.src); // ya es .webp
    const placeholderDir = path.join(publicDir, "placeholders", photo.category);
    const placeholderDestPath = path.join(placeholderDir, placeholderFileName);
    const placeholderSrc = `placeholders/${photo.category}/${placeholderFileName}`.replace(/\\/g, "/");

    // --- Obtener dimensiones y calcular relación de aspecto ---
    const metadata = await sharp(sourcePath).metadata();
    const width = metadata.width ?? 1;
    const height = metadata.height ?? 1;

    // --- Optimización: Solo generar si es necesario ---
    const sourceStats = await fs.stat(sourcePath);
    const placeholderExists = await fs.pathExists(placeholderDestPath);

    if (placeholderExists) {
      const placeholderStats = await fs.stat(placeholderDestPath);
      if (sourceStats.mtime <= placeholderStats.mtime) {
        console.log(`= ⏩ Placeholder ya está actualizado para: ${photo.src}`);
        return { ...photo, placeholderSrc, id, width, height };
      }
    }

    // --- Generar directorios si no existen ---
    await fs.ensureDir(placeholderDir);

    // Generar placeholder WebP
    await sharp(sourcePath)
      .resize(PLACEHOLDER_WIDTH)
      .blur(PLACEHOLDER_BLUR)
      .webp({ quality: PLACEHOLDER_WEBP_QUALITY })
      .toFile(placeholderDestPath);
    console.log(`+ ✔️  Placeholder generado para: ${photo.src}`);

    return { ...photo, placeholderSrc, id, width, height };
  } catch (error) {
    console.error(`- ❌ Error procesando ${photo.src}:`, error);
    return { ...photo, placeholderSrc: "", id, width: 1, height: 1 };
  }
}

/**
 * Función principal que orquesta todo el proceso.
 */
async function main() {
  console.log("🚀 Iniciando la generación de placeholders...");

  const photosByCategory = await getPhotosData();
  const newPhotosData = {};
  let idCounter = 1;

  for (const category in photosByCategory) {
    if (Object.hasOwnProperty.call(photosByCategory, category)) {
      console.log(`\n--- Procesando categoría: ${category} ---`);
      const photosInCat = photosByCategory[category];
      const processingPromises = [];
      for (const photo of photosInCat) {
        const photoWithCategory = { ...photo, category };
        processingPromises.push(processImage(photoWithCategory, idCounter++));
      }
      newPhotosData[category] = await Promise.all(processingPromises);
    }
  }

  await fs.writeJson(generatedPhotosPath, newPhotosData, { spaces: 2 });

  console.log("\n✅ ¡Proceso completado!");
}

main().catch(console.error);
