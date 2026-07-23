import { useState, useEffect } from 'react';
import PredictorForm from './components/PredictorForm';
import PreviewSection from './components/PreviewSection';
import './styles/index.css';

function App() {
  const [pasaranList, setPasaranList] = useState({ pagi: [], malam: [] });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPasaran();
  }, []);

  const fetchPasaran = async () => {
    try {
      const response = await fetch('/api/predictor/pasaran');
      const data = await response.json();
      setPasaranList(data);
    } catch (error) {
      console.error('Error fetching pasaran:', error);
      setMessage({
        type: 'error',
        text: 'Gagal memuat data pasaran'
      });
    }
  };

  const handleGenerateSuccess = (imageBlob, type) => {
    const imageUrl = URL.createObjectURL(imageBlob);
    setPreviewImage(imageUrl);
    
    if (type === 'batch') {
      setMessage({
        type: 'success',
        text: 'Batch generated berhasil! Download sudah dimulai.'
      });
    } else {
      setMessage({
        type: 'success',
        text: 'Prediksi berhasil di-generate!'
      });
    }
  };

  const handleError = (error) => {
    setMessage({
      type: 'error',
      text: error.message || 'Terjadi kesalahan'
    });
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{
          fontSize: '36px',
          color: '#ffd42e',
          marginBottom: '10px',
          textShadow: '0 0 20px rgba(255, 212, 46, 0.5)'
        }}>
          🎰 PREDIKSIVISA
        </h1>
        <p style={{ color: '#aaa', fontSize: '16px' }}>Generator Prediksi Visa Toto</p>
      </header>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
          <button
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '18px',
              padding: 0
            }}
            onClick={() => setMessage(null)}
          >
            ×
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div>
          <PredictorForm
            pasaranList={pasaranList}
            onSuccess={handleGenerateSuccess}
            onError={handleError}
            onLoading={setLoading}
          />
        </div>
        <div>
          <PreviewSection previewImage={previewImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
