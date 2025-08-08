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
const PLACEHOLDER_WIDTH = 20;
const PLACEHOLDER_BLUR = 1.5;
const PLACEHOLDER_QUALITY = 80;

// --- Lógica del Script ---

/**
 * Lee los datos de las fotos desde el archivo JSON base.
 */
async function getPhotosData() {
  const photos = await fs.readJson(sourcePhotosPath);
  return photos;
}

/**
 * Calcula el máximo común divisor para simplificar la relación de aspecto.
 * @param {number} a - Ancho.
 * @param {number} b - Alto.
 * @returns {number} El máximo común divisor.
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Procesa una sola imagen para crear su placeholder.
 * @param {object} photo - El objeto de la foto del archivo de datos.
 * @param {number} id - El ID consecutivo para asignar a la foto.
 * @returns {Promise<object>} El objeto de la foto actualizado con placeholderSrc.
 */
async function processImage(photo, id) {
  try {
    const sourcePath = path.join(publicDir, photo.src);
    if (!(await fs.pathExists(sourcePath))) {
      console.warn(`- ⚠️  Advertencia: No se encontró la imagen fuente, se omitirá: ${photo.src}`);
      return { ...photo, id, width: 1, height: 1, placeholderSrc: "" };
    }

    const placeholderDir = path.join(publicDir, "placeholders", photo.category);
    const placeholderFileName = path.basename(photo.src);
    const placeholderDestPath = path.join(placeholderDir, placeholderFileName);
    const placeholderSrc = `placeholders/${photo.category}/${placeholderFileName}`.replace(/\\/g, "/");

    // --- Obtener dimensiones y calcular relación de aspecto ---
    const metadata = await sharp(sourcePath).metadata();
    const originalWidth = metadata.width ?? 1;
    const originalHeight = metadata.height ?? 1;
    const divisor = gcd(originalWidth, originalHeight);
    const width = originalWidth / divisor;
    const height = originalHeight / divisor;

    // --- Optimización: Solo generar si es necesario ---
    if (await fs.pathExists(placeholderDestPath)) {
      const sourceStats = await fs.stat(sourcePath);
      const placeholderStats = await fs.stat(placeholderDestPath);
      if (sourceStats.mtime <= placeholderStats.mtime) {
        console.log(`= ⏩ Placeholder ya está actualizado para: ${photo.src}`);
        return { ...photo, id, width, height, placeholderSrc };
      }
    }

    await fs.ensureDir(placeholderDir);

    // Usa sharp para redimensionar, aplicar blur y comprimir la imagen.
    await sharp(sourcePath)
      .resize(PLACEHOLDER_WIDTH) // Redimensiona a 20px de ancho, manteniendo la proporción.
      .blur(PLACEHOLDER_BLUR) // Aplica un desenfoque suave.
      .jpeg({ quality: PLACEHOLDER_QUALITY }) // Comprime la imagen.
      .toFile(placeholderDestPath);

    console.log(`+ ✔️  Placeholder generado para: ${photo.src}`);

    return { ...photo, id, width, height, placeholderSrc };
  } catch (error) {
    console.error(`- ❌ Error procesando ${photo.src}:`, error);
    return { ...photo, id, width: 1, height: 1, placeholderSrc: "" };
  }
}

/**
 * Función principal que orquesta todo el proceso.
 */
async function main() {
  console.log("🚀 Iniciando la generación de placeholders...");

  const photosFromBase = await getPhotosData();

  // Procesa cada foto para añadir ID, width, height y placeholder
  const updatedPhotos = await Promise.all(photosFromBase.map((photo, index) => processImage(photo, index + 1)));

  await fs.writeJson(generatedPhotosPath, updatedPhotos, { spaces: 2 });

  console.log("\n✅ ¡Proceso completado!");
  console.log(`✅ El archivo ${generatedPhotosPath} ha sido creado/actualizado con IDs, width, height y placeholders.`);
  console.log(`ℹ️  'photos.json' ahora contiene 'width' y 'height' numéricos para uso en la app.`);
}

main().catch(console.error);
