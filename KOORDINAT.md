# SETUP KOORDINAT PIXEL UNTUK POSITIONING TEXT

## Informasi Background
- Ukuran: 564x754 px
- Format: PNG
- Color: Dark/Black dengan gold accents

## Cara Mengukur Koordinat

### Tools yang bisa digunakan:
1. **Photoshop/GIMP**: Buka background image, hover ke posisi, lihat koordinat
2. **Online Tool**: https://github.com/deathly809/pixelcoordinates
3. **Browser DevTools**: Buka image di browser, inspect element

### Steps Mengukur:

1. Buka background image dengan tools design (Photoshop/GIMP/Canva)
2. Gunakan guide atau grid untuk membantu alignment
3. Tentukan posisi untuk setiap element:
   - BBFS (6 digit)
   - ANGKA MAIN (4 digit)
   - COLOK BEBAS (2 digit dengan /)
   - 2D (4 bagian)
   - 3D (3 baris)
   - 4D (3 baris)
   - SHIO (nama)

## Template Koordinat

Setelah Anda mengukur, edit file `backend/utils/imageGenerator.js` di bagian `positions` object:

```javascript
const positions = {
  tanggal: { x: 282, y: 30, fontSize: 16, anchor: 'middle' },
  pasaran: { x: 282, y: 60, fontSize: 20, anchor: 'middle' },
  bbfs: { x: 282, y: 120, fontSize: 29.2, anchor: 'middle' },
  angkaMain: { x: 282, y: 180, fontSize: 27.9, anchor: 'middle' },
  colokBebas: { x: 282, y: 240, fontSize: 34, anchor: 'middle' },
  
  // Isi koordinat Anda di sini
  // ...
};
```

## Elemen & Koordinat Estimasi

Berdasarkan gambar contoh Anda, berikut estimasi koordinat (adjust sesuai kebutuhan):

```javascript
const positions = {
  // Header
  tanggal: { x: 282, y: 30, fontSize: 16, anchor: 'middle' },      // Di atas judul
  pasaran: { x: 282, y: 60, fontSize: 20, anchor: 'middle' },      // Nama pasaran
  
  // Main prediction elements
  bbfs: { x: 282, y: 120, fontSize: 29.2, anchor: 'middle' },      // B.B.F.S 6 digit
  angkaMain: { x: 282, y: 180, fontSize: 27.9, anchor: 'middle' }, // A.N.G.K.A M.A.I.N
  colokBebas: { x: 282, y: 240, fontSize: 34, anchor: 'middle' },  // C.O.L.O.K B.E.B.A.S
  
  // 4D (3 baris vertical)
  '4d_baris1': { x: 282, y: 300, fontSize: 25.2, anchor: 'middle' },  // Top
  '4d_baris2': { x: 282, y: 340, fontSize: 25.2, anchor: 'middle' },  // Middle
  '4d_baris3': { x: 282, y: 380, fontSize: 25.2, anchor: 'middle' },  // Bottom
  
  // 3D (3 baris vertical)
  '3d_baris1': { x: 282, y: 440, fontSize: 25.2, anchor: 'middle' },  // Top
  '3d_baris2': { x: 282, y: 480, fontSize: 25.2, anchor: 'middle' },  // Middle
  '3d_baris3': { x: 282, y: 520, fontSize: 25.2, anchor: 'middle' },  // Bottom
  
  // 2D (4 posisi - corners)
  '2d_topRight': { x: 470, y: 280, fontSize: 25.2, anchor: 'middle' },     // Top-right
  '2d_bottomRight': { x: 470, y: 420, fontSize: 25.2, anchor: 'middle' },  // Bottom-right
  '2d_bottomLeft': { x: 95, y: 420, fontSize: 25.2, anchor: 'middle' },    // Bottom-left
  '2d_topLeft': { x: 95, y: 280, fontSize: 25.2, anchor: 'middle' },       // Top-left
  
  // SHIO
  shio: { x: 282, y: 580, fontSize: 20, anchor: 'middle' }  // Bottom
};
```

## Testing Positioning

1. Generate preview di frontend
2. Lihat apakah text muncul di posisi yang benar
3. Jika tidak, adjust koordinat di `positions` object
4. Repeat hingga sempurna

## Catatan

- X coordinate: 0 = left edge, 564 = right edge, 282 = center
- Y coordinate: 0 = top edge, 754 = bottom edge
- `anchor: 'middle'` = text center pada koordinat X
- Untuk text alignment, gunakan nilai lain: 'start', 'end'

## Fine Tuning

Setelah test, jika text:
- Terlalu ke atas: kurangi Y value
- Terlalu ke bawah: tambah Y value
- Terlalu ke kiri: kurangi X value
- Terlalu ke kanan: tambah X value

