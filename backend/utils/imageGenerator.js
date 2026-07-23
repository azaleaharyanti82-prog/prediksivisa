const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

/**
 * Generate gambar prediksi dengan overlay text
 * @param {Object} prediction - Hasil prediksi (BBFS, 2D, 3D, 4D, dll)
 * @param {Buffer} backgroundImage - Buffer gambar background
 * @param {string} pasaranName - Nama pasaran
 * @param {string} tanggal - Tanggal (format: DD-MMM-YYYY)
 * @returns {Buffer} PNG image buffer
 */
async function generateImage(prediction, backgroundImage, pasaranName, tanggal) {
  try {
    let image = sharp(backgroundImage);
    const metadata = await image.metadata();

    // SVG untuk overlay semua text
    const svgOverlay = createSVGOverlay(prediction, pasaranName, tanggal, metadata);
    
    image = image.composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0
      }
    ]);

    return await image.png().toBuffer();
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * Create SVG overlay dengan semua text
 * Menggunakan koordinat yang sudah ditentukan
 */
function createSVGOverlay(prediction, pasaranName, tanggal, imgMetadata) {
  const width = imgMetadata.width;
  const height = imgMetadata.height;

  // NOTE: Koordinat ini perlu disesuaikan dengan gambar asli
  // Untuk sekarang, saya menggunakan estimasi berdasarkan deskripsi
  // User akan melakukan fine-tuning setelah test

  const positions = {
    tanggal: { x: width / 2, y: 30, fontSize: 16, anchor: 'middle' },
    pasaran: { x: width / 2, y: 60, fontSize: 20, anchor: 'middle' },
    bbfs: { x: width / 2, y: 120, fontSize: 29.2, anchor: 'middle' },
    angkaMain: { x: width / 2, y: 180, fontSize: 27.9, anchor: 'middle' },
    colokBebas: { x: width / 2, y: 240, fontSize: 34, anchor: 'middle' },
    
    // 4D positions (3 baris)
    '4d_baris1': { x: width / 2, y: 300, fontSize: 25.2, anchor: 'middle' },
    '4d_baris2': { x: width / 2, y: 340, fontSize: 25.2, anchor: 'middle' },
    '4d_baris3': { x: width / 2, y: 380, fontSize: 25.2, anchor: 'middle' },
    
    // 3D positions (3 baris)
    '3d_baris1': { x: width / 2, y: 440, fontSize: 25.2, anchor: 'middle' },
    '3d_baris2': { x: width / 2, y: 480, fontSize: 25.2, anchor: 'middle' },
    '3d_baris3': { x: width / 2, y: 520, fontSize: 25.2, anchor: 'middle' },
    
    // 2D positions (4 bagian)
    '2d_topRight': { x: width - 100, y: 280, fontSize: 25.2, anchor: 'middle' },
    '2d_bottomRight': { x: width - 100, y: 420, fontSize: 25.2, anchor: 'middle' },
    '2d_bottomLeft': { x: 100, y: 420, fontSize: 25.2, anchor: 'middle' },
    '2d_topLeft': { x: 100, y: 280, fontSize: 25.2, anchor: 'middle' },
    
    // SHIO position
    shio: { x: width / 2, y: 580, fontSize: 20, anchor: 'middle' }
  };

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Tanggal
  svg += createTextElement(tanggal, positions.tanggal, '#ffd42e', 'Arial');
  
  // Pasaran
  svg += createTextElement(pasaranName, positions.pasaran, '#ffd42e', 'Arial');
  
  // BBFS
  svg += createTextElement(prediction.bbfs, positions.bbfs, '#ffd42e', 'Times New Roman');
  
  // ANGKA MAIN
  svg += createTextElement(prediction.angka_main, positions.angkaMain, '#ffd42e', 'Times New Roman');
  
  // COLOK BEBAS (dengan separator /)
  const colokBebas1 = prediction.colok_bebas[0];
  const colokBebas2 = prediction.colok_bebas[1];
  svg += createTextElement(colokBebas1, { ...positions.colokBebas, x: positions.colokBebas.x - 30 }, '#ffd42e', 'Times New Roman');
  svg += createTextElement('/', { ...positions.colokBebas, x: positions.colokBebas.x }, '#ffd42e', 'Canva Sans');
  svg += createTextElement(colokBebas2, { ...positions.colokBebas, x: positions.colokBebas.x + 30 }, '#ffd42e', 'Times New Roman');
  
  // 4D
  svg += createTextElement(prediction['4d'].baris1, positions['4d_baris1'], '#ffd42e', 'Times New Roman');
  svg += createTextElement(prediction['4d'].baris2, positions['4d_baris2'], '#ffd42e', 'Times New Roman');
  svg += createTextElement(prediction['4d'].baris3, positions['4d_baris3'], '#ffd42e', 'Times New Roman');
  
  // 3D
  svg += createTextElement(prediction['3d'].baris1, positions['3d_baris1'], '#ffd42e', 'Times New Roman');
  svg += createTextElement(prediction['3d'].baris2, positions['3d_baris2'], '#ffd42e', 'Times New Roman');
  svg += createTextElement(prediction['3d'].baris3, positions['3d_baris3'], '#ffd42e', 'Times New Roman');
  
  // 2D
  svg += createTextElement(prediction['2d'].topRight, positions['2d_topRight'], '#ffd42e', 'Times New Roman');
  svg += createTextElement(prediction['2d'].bottomRight, positions['2d_bottomRight'], '#ffd42e', 'Times New Roman');
  svg += createTextElement(prediction['2d'].bottomLeft, positions['2d_bottomLeft'], '#ffd42e', 'Times New Roman');
  svg += createTextElement(prediction['2d'].topLeft, positions['2d_topLeft'], '#ffd42e', 'Times New Roman');
  
  // SHIO
  svg += createTextElement(prediction.shio, positions.shio, '#ffd42e', 'Arial');
  
  svg += '</svg>';

  return svg;
}

/**
 * Helper function untuk create text element di SVG
 */
function createTextElement(text, position, color, fontFamily) {
  return `<text x="${position.x}" y="${position.y}" font-family="${fontFamily}" font-size="${position.fontSize}" fill="${color}" text-anchor="${position.anchor}" font-weight="bold">${text}</text>`;
}

module.exports = {
  generateImage,
  createSVGOverlay
};
