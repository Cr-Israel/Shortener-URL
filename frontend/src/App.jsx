import { useState } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  async function handleShorten() {
    if (!longUrl.trim()) return;

    try {
      const res = await fetch('http://localhost:3333/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      alert('Erro ao encurtar URL');
    }
  }

  return (
    <div className="container">
      <h1>Encurtador de URL</h1>

      <input
        type="url"
        placeholder="Cole sua URL longa aqui"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <button onClick={handleShorten}>Encurtar</button>

      {shortUrl && (
        <p className="result">
          URL encurtada:{' '}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
