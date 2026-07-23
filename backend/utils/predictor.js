const { SHIO_TABLE } = require('./constants');

/**
 * Generate BBFS (6 digit random)
 * Requirements:
 * - Tidak boleh ada digit yang sama (twin)
 * - Usahakan tidak berurut (0-1, 1-2, dst)
 */
function generateBBFS() {
  const maxAttempts = 1000;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const digits = [];
    const availableDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Generate 6 unique digits
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * availableDigits.length);
      digits.push(availableDigits[randomIndex]);
      availableDigits.splice(randomIndex, 1);
    }

    // Check if valid (tidak berurut)
    if (isValidBBFS(digits)) {
      return digits.join('');
    }

    attempts++;
  }

  // Fallback jika tidak menemukan dalam max attempts
  const digits = [];
  const availableDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * availableDigits.length);
    digits.push(availableDigits[randomIndex]);
    availableDigits.splice(randomIndex, 1);
  }

  return digits.join('');
}

/**
 * Validasi BBFS - check jika tidak berurut
 * Berurut = perbedaan 1 atau -1
 */
function isValidBBFS(digits) {
  for (let i = 0; i < digits.length - 1; i++) {
    const diff = Math.abs(digits[i] - digits[i + 1]);
    if (diff === 1) {
      return false; // Berurut, tidak valid
    }
  }
  return true;
}

/**
 * Generate semua hasil prediksi dari BBFS
 */
function generatePrediction(bbfs) {
  const digits = bbfs.split('').map(Number);
  const d = digits; // shorthand: [d0, d1, d2, d3, d4, d5]

  return {
    bbfs,
    // ANGKA MAIN: 2 digit terakhir dibalik + 2 digit pertama
    // Last 2 digits reversed: d5 d4, First 2 digits: d0 d1
    angka_main: `${d[5]}${d[4]}${d[0]}${d[1]}`,
    // COLOK BEBAS: digit pertama + digit terakhir
    colok_bebas: `${d[0]}${d[5]}`,
    // 4D:
    // Baris 1 (bottom): d0 d1 d2 d3
    // Baris 2 (middle): d2 d4 d3 d5
    // Baris 3 (top): d4 d5 d0 d1
    '4d': {
      baris1: `${d[0]}${d[1]}${d[2]}${d[3]}`,
      baris2: `${d[2]}${d[4]}${d[3]}${d[5]}`,
      baris3: `${d[4]}${d[5]}${d[0]}${d[1]}`
    },
    // 3D:
    // Baris 1: d0 d1 d2
    // Baris 2: d3 d4 d5
    // Baris 3: d5 d2 d0
    '3d': {
      baris1: `${d[0]}${d[1]}${d[2]}`,
      baris2: `${d[3]}${d[4]}${d[5]}`,
      baris3: `${d[5]}${d[2]}${d[0]}`
    },
    // 2D:
    // Top-right: d1 d2
    // Bottom-right: d0 d3
    // Bottom-left: d2 d4
    // Top-left: d3 d5
    '2d': {
      topRight: `${d[1]}${d[2]}`,
      bottomRight: `${d[0]}${d[3]}`,
      bottomLeft: `${d[2]}${d[4]}`,
      topLeft: `${d[3]}${d[5]}`
    },
    // SHIO: dari 2 digit pertama BBFS
    shio: SHIO_TABLE[`${d[0]}${d[1]}`.padStart(2, '0')] || 'Unknown'
  };
}

module.exports = {
  generateBBFS,
  generatePrediction
};
