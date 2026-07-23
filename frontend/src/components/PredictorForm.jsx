import { useState } from 'react';
import axios from 'axios';

function PredictorForm({ pasaranList, onSuccess, onError, onLoading }) {
  const [generationType, setGenerationType] = useState('single');
  const [pasaranId, setPasaranId] = useState('');
  const [tipe, setTipe] = useState('pagi');
  const [tanggal, setTanggal] = useState('');
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundFile(file);
    }
  };

  const handleGenerateSingle = async () => {
    if (!backgroundFile) {
      onError(new Error('Background image harus dipilih'));
      return;
    }
    if (!pasaranId) {
      onError(new Error('Pasaran harus dipilih'));
      return;
    }
    if (!tanggal) {
      onError(new Error('Tanggal harus dipilih'));
      return;
    }

    try {
      setLoading(true);
      onLoading(true);

      const formData = new FormData();
      formData.append('background', backgroundFile);
      formData.append('pasaranId', pasaranId);
      formData.append('tanggal', tanggal);

      const response = await axios.post('/api/predictor/generate-single', formData, {
        responseType: 'blob'
      });

      onSuccess(response.data, 'single');
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  const handleGenerateBatch = async () => {
    if (!backgroundFile) {
      onError(new Error('Background image harus dipilih'));
      return;
    }
    if (!tanggal) {
      onError(new Error('Tanggal harus dipilih'));
      return;
    }

    try {
      setLoading(true);
      onLoading(true);

      const formData = new FormData();
      formData.append('background', backgroundFile);
      formData.append('tipe', tipe);
      formData.append('tanggal', tanggal);

      const response = await axios.post('/api/predictor/generate-batch', formData, {
        responseType: 'blob'
      });

      // Download ZIP
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `predictions_${tipe}_${tanggal}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      onSuccess(response.data, 'batch');
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  const handlePreview = async () => {
    if (!backgroundFile) {
      onError(new Error('Background image harus dipilih'));
      return;
    }
    if (!pasaranId) {
      onError(new Error('Pasaran harus dipilih'));
      return;
    }
    if (!tanggal) {
      onError(new Error('Tanggal harus dipilih'));
      return;
    }

    try {
      setLoading(true);
      onLoading(true);

      const formData = new FormData();
      formData.append('background', backgroundFile);
      formData.append('pasaranId', pasaranId);
      formData.append('tanggal', tanggal);

      const response = await axios.post('/api/predictor/preview', formData, {
        responseType: 'blob'
      });

      onSuccess(response.data, 'preview');
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>⚙️ Generator Prediksi</h2>

      <div className="form-group">
        <label>Jenis Generate</label>
        <select
          value={generationType}
          onChange={(e) => setGenerationType(e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="single">Single Pasaran</option>
          <option value="batch">Batch (Pagi/Malam)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Background Image (PNG, ukuran 564x754)</label>
        <input
          type="file"
          accept="image/png"
          onChange={handleBackgroundChange}
          disabled={loading}
          style={{ width: '100%' }}
        />
        {backgroundFile && (
          <p style={{ color: '#4caf50', marginTop: '5px', fontSize: '12px' }}>
            ✓ {backgroundFile.name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Tanggal Prediksi</label>
        <input
          type="text"
          placeholder="DD-MMM-YYYY (contoh: 23-JUL-2026)"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value.toUpperCase())}
          disabled={loading}
          style={{ width: '100%' }}
        />
      </div>

      {generationType === 'single' ? (
        <div className="form-group">
          <label>Pilih Pasaran</label>
          <select
            value={pasaranId}
            onChange={(e) => setPasaranId(e.target.value)}
            disabled={loading}
            style={{ width: '100%' }}
          >
            <option value="">-- Pilih Pasaran --</option>
            <optgroup label="Pagi (01-34)">
              {pasaranList.pagi.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id.toString().padStart(2, '0')}. {p.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Malam (35-63)">
              {pasaranList.malam.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id.toString().padStart(2, '0')}. {p.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      ) : (
        <div className="form-group">
          <label>Tipe Generate</label>
          <select
            value={tipe}
            onChange={(e) => setTipe(e.target.value)}
            disabled={loading}
            style={{ width: '100%' }}
          >
            <option value="pagi">Pagi (34 Pasaran)</option>
            <option value="malam">Malam (29 Pasaran)</option>
          </select>
        </div>
      )}

      <div className="button-group">
        {generationType === 'single' ? (
          <>
            <button
              className="btn"
              onClick={handlePreview}
              disabled={loading}
            >
              {loading ? <span className="loading"></span> : '👁️'} Preview
            </button>
            <button
              className="btn"
              onClick={handleGenerateSingle}
              disabled={loading}
            >
              {loading ? <span className="loading"></span> : '🎲'} Generate Single
            </button>
          </>
        ) : (
          <button
            className="btn"
            onClick={handleGenerateBatch}
            disabled={loading}
          >
            {loading ? <span className="loading"></span> : '📦'} Generate & Download
          </button>
        )}
      </div>

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#999' }}>
        <p>💡 Tips:</p>
        <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
          <li>Background harus format PNG dengan ukuran 564x754</li>
          <li>Gunakan preview untuk lihat hasil sebelum generate batch</li>
          <li>Format tanggal: DD-MMM-YYYY (contoh: 23-JUL-2026)</li>
          <li>Batch pagi = 34 pasaran, Batch malam = 29 pasaran</li>
        </ul>
      </div>
    </div>
  );
}

export default PredictorForm;
