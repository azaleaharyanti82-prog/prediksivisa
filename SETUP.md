# Prediksivisa - Setup Guide

## Instalasi Lengkap

### 1. Prerequisites
- Node.js v16+
- npm atau yarn
- Git

### 2. Clone Repository

```bash
git clone https://github.com/azaleaharyanti82-prog/prediksivisa.git
cd prediksivisa
```

### 3. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 4. Setup Environment Variables

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
PORT=3001
NODE_ENV=development
```

### 5. Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Output:
```
Server running on port 3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Output:
```
➜  Local:   http://localhost:3000/
```

Buka browser ke `http://localhost:3000`

### 6. Testing

1. Upload background image (PNG, 564x754)
2. Select tanggal format DD-MMM-YYYY
3. Klik Preview untuk melihat hasil
4. Klik Generate untuk download

## Build untuk Production

### Frontend
```bash
cd frontend
npm run build
```

Hasil ada di `frontend/dist/`

### Backend
Tidak perlu build, langsung run dengan `node server.js`

## Deployment ke EdgeOne

### 1. Persiapan

**Backend:**
- Build dan test locally
- Pastikan semua dependencies ada di `package.json`
- Update `PORT` di `.env` sesuai EdgeOne config

**Frontend:**
```bash
cd frontend
npm run build
```

### 2. Deploy Backend ke EdgeOne

#### Option A: Menggunakan EdgeOne CLI

1. Install EdgeOne CLI:
```bash
npm install -g @edgeone/cli
```

2. Login:
```bash
edgeone login
```

3. Deploy:
```bash
cd backend
edgeone deploy
```

#### Option B: Menggunakan Git Integration

1. Push ke GitHub
2. Connect GitHub repo ke EdgeOne dashboard
3. EdgeOne akan auto-deploy saat ada push ke branch tertentu

### 3. Deploy Frontend ke EdgeOne

1. Build terlebih dahulu:
```bash
cd frontend
npm run build
```

2. Upload folder `dist/` ke EdgeOne static hosting

### 4. Configure EdgeOne

1. Set environment variables di EdgeOne dashboard:
   - `NODE_ENV=production`
   - `PORT=3001` (atau sesuai EdgeOne)

2. Setup reverse proxy:
   - Frontend: `example.com`
   - Backend: `example.com/api`

3. Enable CORS di backend untuk production domain

### 5. Verify Deployment

```bash
curl https://your-domain.edgeone.cn/api/health
```

Response:
```json
{"status": "OK", "message": "Backend is running"}
```

## Troubleshooting

### Port already in use
```bash
# Backend (default 3001)
PORT=3002 npm run dev

# Frontend (default 3000)
npm run dev -- --port 3001
```

### CORS errors
Pastikan backend `.env` memiliki config CORS yang benar dan frontend URL diizinkan

### Image generation errors
- Pastikan Sharp terinstall dengan benar: `npm install sharp`
- Check ukuran background: harus 564x754
- Pastikan file PNG valid

### Module not found
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
prediksivisa/
├── backend/
│   ├── routes/
│   │   └── predictor.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── predictor.js
│   │   └── imageGenerator.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PredictorForm.jsx
│   │   │   └── PreviewSection.jsx
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── README.md
└── SETUP.md
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Get Pasaran List
```
GET /api/predictor/pasaran
```

### Generate Single
```
POST /api/predictor/generate-single
Content-Type: multipart/form-data

Body:
- background: File (PNG)
- pasaranId: number
- tanggal: string (DD-MMM-YYYY)

Response: PNG image
```

### Generate Batch
```
POST /api/predictor/generate-batch
Content-Type: multipart/form-data

Body:
- background: File (PNG)
- tipe: string (pagi/malam)
- tanggal: string (DD-MMM-YYYY)

Response: ZIP file
```

### Preview
```
POST /api/predictor/preview
Content-Type: multipart/form-data

Body:
- background: File (PNG)
- pasaranId: number
- tanggal: string (DD-MMM-YYYY)

Response: PNG image
```

## Notes

- BBFS di-generate random setiap kali request
- Tidak ada caching untuk hasil prediksi
- Setiap request generate image baru dari scratch
- Background image harus selalu di-upload (tidak di-cache)

