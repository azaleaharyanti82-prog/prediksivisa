# Prediksivisa - Generator Prediksi Visa Toto

Aplikasi web untuk generate prediksi visa toto dengan algoritma khusus.

## Fitur

- Generate BBFS (6 digit random tanpa twin dan usahakan tidak berurut)
- Generate prediksi otomatis (ANGKA MAIN, COLOK BEBAS, 2D, 3D, 4D, SHIO)
- Support 63 pasaran (34 pagi + 29 malam)
- Generate single pasaran atau batch (pagi/malam)
- Download hasil sebagai ZIP
- Preview hasil prediksi
- Custom background upload

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React (Vite)
- **Image Processing**: Sharp
- **Archive**: Archiver

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### GET /api/predictor/pasaran
Get list semua pasaran

### POST /api/predictor/preview
Generate preview gambar prediksi

### POST /api/predictor/generate-single
Generate single pasaran

### POST /api/predictor/generate-batch
Generate batch pasaran (pagi/malam)

## Deploy

Deploy ke EdgeOne menggunakan EdgeOne CLI atau dashboard.

