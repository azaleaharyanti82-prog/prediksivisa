const express = require('express');
const multer = require('multer');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs').promises;
const fsSync = require('fs');

const { generateBBFS, generatePrediction } = require('../utils/predictor');
const { generateImage } = require('../utils/imageGenerator');
const { PASARAN } = require('../utils/constants');

const router = express.Router();

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * POST /api/predictor/generate-single
 * Generate prediksi untuk satu pasaran
 */
router.post('/generate-single', upload.single('background'), async (req, res) => {
  try {
    const { pasaranId, tanggal } = req.body;

    if (!req.file || !pasaranId || !tanggal) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find pasaran
    const allPasaran = [...PASARAN.PAGI, ...PASARAN.MALAM];
    const pasaran = allPasaran.find(p => p.id === parseInt(pasaranId));

    if (!pasaran) {
      return res.status(404).json({ error: 'Pasaran not found' });
    }

    // Generate prediction
    const bbfs = generateBBFS();
    const prediction = generatePrediction(bbfs);

    // Generate image
    const imageBuffer = await generateImage(prediction, req.file.buffer, pasaran.name, tanggal);

    // Send image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="${pasaran.name}_${tanggal}.png"`);
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/predictor/generate-batch
 * Generate prediksi untuk multiple pasaran (Pagi/Malam)
 */
router.post('/generate-batch', upload.single('background'), async (req, res) => {
  try {
    const { tipe, tanggal } = req.body; // tipe: 'pagi' atau 'malam'

    if (!req.file || !tipe || !tanggal) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['pagi', 'malam'].includes(tipe)) {
      return res.status(400).json({ error: 'Tipe harus pagi atau malam' });
    }

    const pasarList = tipe === 'pagi' ? PASARAN.PAGI : PASARAN.MALAM;
    const tempDir = path.join(__dirname, '../temp', `batch_${Date.now()}`);

    // Create temp directory
    await fs.mkdir(tempDir, { recursive: true });

    const predictions = [];
    let lastPrediction = null;

    // Generate images for all pasaran
    for (const pasaran of pasarList) {
      const bbfs = generateBBFS();
      const prediction = generatePrediction(bbfs);
      lastPrediction = { ...prediction, pasaran: pasaran.name };

      const imageBuffer = await generateImage(prediction, req.file.buffer, pasaran.name, tanggal);
      const filename = `${pasaran.id.toString().padStart(2, '0')}_${pasaran.name.replace(/\s+/g, '_')}.png`;
      await fs.writeFile(path.join(tempDir, filename), imageBuffer);

      predictions.push({
        pasaranId: pasaran.id,
        pasaranName: pasaran.name,
        prediction,
        filename
      });

      console.log(`Generated: ${filename}`);
    }

    // Create ZIP file
    const zipPath = path.join(__dirname, '../temp', `batch_${Date.now()}.zip`);
    await createZipFile(tempDir, zipPath);

    // Read ZIP file
    const zipBuffer = await fs.readFile(zipPath);

    // Cleanup
    await fs.rm(tempDir, { recursive: true });
    await fs.rm(zipPath);

    // Return ZIP and last prediction for preview
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="predictions_${tipe}_${tanggal}.zip"`);
    res.setHeader('X-Last-Prediction', JSON.stringify(lastPrediction));
    res.send(zipBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/predictor/pasaran
 * Get list of all pasaran
 */
router.get('/pasaran', (req, res) => {
  res.json({
    pagi: PASARAN.PAGI,
    malam: PASARAN.MALAM
  });
});

/**
 * POST /api/predictor/preview
 * Generate preview image (untuk lihat hasil sebelum generate batch)
 */
router.post('/preview', upload.single('background'), async (req, res) => {
  try {
    const { pasaranId, tanggal } = req.body;

    if (!req.file || !pasaranId || !tanggal) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const allPasaran = [...PASARAN.PAGI, ...PASARAN.MALAM];
    const pasaran = allPasaran.find(p => p.id === parseInt(pasaranId));

    if (!pasaran) {
      return res.status(404).json({ error: 'Pasaran not found' });
    }

    const bbfs = generateBBFS();
    const prediction = generatePrediction(bbfs);
    const imageBuffer = await generateImage(prediction, req.file.buffer, pasaran.name, tanggal);

    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Helper function untuk create ZIP file
 */
function createZipFile(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fsSync.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

module.exports = router;
