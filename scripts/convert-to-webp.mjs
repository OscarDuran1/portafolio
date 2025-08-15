import sharp from "sharp";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { glob } from "glob";

// --- Configuración de Rutas ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const imgDir = path.join(projectRoot, "public", "img");

// --- Configuración de Calidad ---
const WEBP_QUALITY = 85;

/**
 * Convierte una imagen JPG a WebP.
 * @param {string} jpgPath - Ruta completa al archivo JPG.
 */
async function convertToWebp(jpgPath) {
  const webpPath = jpgPath.replace(/\.jpg$/, ".webp");

  try {
    // Opcional: Verificar si el archivo WebP ya existe y es más reciente
    if (await fs.pathExists(webpPath)) {
      const jpgStats = await fs.stat(jpgPath);
      const webpStats = await fs.stat(webpPath);
      if (webpStats.mtime > jpgStats.mtime) {
        console.log(`= ⏩ Saltando, ${path.basename(webpPath)} ya está actualizado.`);
        return;
      }
    }

    await sharp(jpgPath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);

    console.log(`+ ✔️  Convertido: ${path.basename(jpgPath)} -> ${path.basename(webpPath)}`);
  } catch (error) {
    console.error(`- ❌ Error convirtiendo ${path.basename(jpgPath)}:`, error);
  }
}

/**
 * Función principal que busca y convierte todas las imágenes JPG.
 */
async function main() {
  console.log("🚀 Iniciando conversión de imágenes JPG a WebP...");
  const jpgFiles = await glob(`${imgDir}/**/*.jpg`);
  await Promise.all(jpgFiles.map(convertToWebp));
  console.log("\n✅ ¡Conversión completada!");
}

main().catch(console.error);