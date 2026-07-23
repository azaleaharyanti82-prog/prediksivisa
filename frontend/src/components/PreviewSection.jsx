function PreviewSection({ previewImage }) {
  return (
    <div className="section">
      <h2>👁️ Preview Hasil</h2>
      
      {previewImage ? (
        <div className="preview-container">
          <img src={previewImage} alt="Preview" className="preview-image" />
          <p style={{ marginTop: '15px', fontSize: '12px', color: '#aaa' }}>
            Ini adalah preview gambar terakhir yang di-generate
          </p>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '8px',
          border: '2px dashed rgba(255, 212, 46, 0.2)'
        }}>
          <p style={{ color: '#999', fontSize: '14px' }}
          >📷 Belum ada preview</p>
          <p style={{ color: '#666', fontSize: '12px', marginTop: '10px' }}
          >Generate prediksi terlebih dahulu untuk melihat preview</p>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
        <p><strong>Informasi:</strong></p>
        <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
          <li>Preview menampilkan hasil generate terakhir</li>
          <li>Untuk batch, preview menampilkan pasaran terakhir</li>
          <li>Setiap generate menghasilkan BBFS random baru</li>
        </ul>
      </div>
    </div>
  );
}

export default PreviewSection;
