# Deployment ke EdgeOne - Step by Step

## Persiapan

### 1. Create EdgeOne Account
- Kunjungi https://console.edgeone.ai
- Buat akun baru atau login
- Verifikasi email

### 2. Create New Application

**Untuk Backend:**
1. Di EdgeOne console, klik "New Application"
2. Pilih "Node.js"
3. Beri nama: `prediksivisa-backend`
4. Tentukan region (pilih terdekat)

**Untuk Frontend:**
1. Klik "New Static Site"
2. Beri nama: `prediksivisa-frontend`
3. Pilih GitHub integration

### 3. Setup GitHub Integration (Recommended)

#### Backend
1. Di EdgeOne app settings, klik "Connect GitHub"
2. Authorize EdgeOne access ke GitHub
3. Select repo: `prediksivisa`
4. Select branch: `main`
5. Build command: `cd backend && npm install`
6. Start command: `node server.js`

#### Frontend
1. Di EdgeOne static site settings, klik "Connect GitHub"
2. Select repo: `prediksivisa`
3. Select branch: `main`
4. Build command: `cd frontend && npm run build`
5. Publish directory: `frontend/dist`

### 4. Environment Variables

Di EdgeOne dashboard, setup environment variables untuk backend:

```
PORT=3001
NODE_ENV=production
```

### 5. Custom Domain (Optional)

1. Backend domain: `api.prediksivisa.com`
2. Frontend domain: `prediksivisa.com`
3. Configure DNS records sesuai instruksi EdgeOne

## Manual Deployment

### Jika tidak ingin menggunakan GitHub integration:

#### 1. Build Aplikasi

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
npm run build
```

#### 2. Create Deployment Package

```bash
# Buat folder untuk deployment
mkdir prediksivisa-deploy
cd prediksivisa-deploy

# Copy backend files
cp -r ../backend .

# Copy frontend dist
cp -r ../frontend/dist ./frontend_dist

# Create package.json di root
cat > package.json << 'EOF'
{
  "name": "prediksivisa",
  "version": "1.0.0",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "install": "cd backend && npm install"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
EOF
```

#### 3. Push ke EdgeOne

Menggunakan EdgeOne CLI:

```bash
# Install EdgeOne CLI
npm install -g @edgeone/cli

# Login
edgeone login

# Deploy
edgeone deploy
```

## Verify Deployment

### Check Backend Status

```bash
curl https://your-backend-domain/api/health
```

Response:
```json
{"status": "OK", "message": "Backend is running"}
```

### Check Frontend

Buka browser ke `https://your-frontend-domain`

## Update Aplikasi

### Dengan GitHub Integration

Cukup push ke main branch, EdgeOne akan auto-deploy:

```bash
git add .
git commit -m "Update prediksi logic"
git push origin main
```

EdgeOne akan:
1. Detect push
2. Run build command
3. Deploy otomatis

### Manual Update

```bash
# Build
npm run build

# Deploy
edgeone deploy
```

## Monitoring

1. Di EdgeOne dashboard, monitor:
   - Requests count
   - Error rate
   - Response time
   - Storage usage

2. Setup alerts untuk:
   - High error rate
   - High latency
   - Resource limit exceeded

## Performance Optimization

### Frontend
- Cache busting dengan hash filenames
- Compress images
- Minify CSS/JS

### Backend
- Enable gzip compression
- Setup CDN untuk static files
- Optimize database queries (jika ada)

## Troubleshooting

### Deploy gagal
- Check build logs di EdgeOne console
- Pastikan semua dependencies di `package.json`
- Verify environment variables

### 502 Bad Gateway
- Backend service down
- Check server logs
- Verify port configuration

### CORS errors di production
- Update CORS settings di backend
- Add production domain ke allowed origins

### Image generation timeout
- Increase timeout setting di EdgeOne
- Optimize image processing
- Reduce image size

## Support

Jika ada masalah:
1. Check EdgeOne documentation: https://docs.edgeone.ai
2. Review application logs di console
3. Contact EdgeOne support

