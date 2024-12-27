import './App.css';
import { getCombinedMessage } from './js/scripts';
import { useState } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [couponImage, setCouponImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [headerText, setHeaderText] = useState('AxoPunk tiene un regalo para ti, coloca tu nombre:');
  const [error, setError] = useState('');

  // Función para generar el mensaje
  const handleGenerateMessage = () => {
    if (name.trim() === '') {
      setError('El nombre no puede estar vacío');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const { text, image } = getCombinedMessage();
      setMessage(`${name}, ${text}`);
      setCouponImage(image);
      setLoading(false);
      setHeaderText('Esta es tu tarjeta navideña');
    }, 3000);
  };

  const handleDownloadCard = async () => {
    const element = document.querySelector(".card-background");
    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: null,
      scale: 2 // Aumentar la escala para mejorar la resolución
    });
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = 1080;
    resizedCanvas.height = 1920;
    const context = resizedCanvas.getContext("2d");
    context.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);
    const link = document.createElement("a");
    link.download = "tarjeta_navideña.png";
    link.href = resizedCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Tarjetas Navideñas</h1>
      </nav>
      <header className="App-header">
        <div className="form-container">
          {!loading && <p>{headerText}</p>}
          {loading ? (
            <>
              <div className="loading-circle"></div>
              <p>Cargando regalo...</p>
            </>
          ) : (
            <>
              {!message && (
                <>
                  <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error && <p className="error-text">{error}</p>}
                  <button onClick={handleGenerateMessage}>Generar Mensaje</button>
                </>
              )}
              {message && (
                <div className="card-background">
                  <div className="card-container">
                    <p
                      className="message"
                      dangerouslySetInnerHTML={{
                        __html: message.replace(/\n/g, '<br>'),
                      }}
                    ></p>
                    {couponImage && (
                      <>
                        <p className="coupon-text">Recibe este cupón:</p>
                        <img src={couponImage} alt="Cupón" className="coupon-image" />
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {message && (
          <button onClick={handleDownloadCard} className="download-button">
            Descargar Tarjeta
          </button>
        )}
      </header>
      <footer className="App-footer">
        <p>
          <img src={process.env.PUBLIC_URL + "/assets/images/AxoPunk.png"} alt="AxoPunk" className="small-image" />
        </p>
      </footer>
    </div>
  );
}

export default App;
