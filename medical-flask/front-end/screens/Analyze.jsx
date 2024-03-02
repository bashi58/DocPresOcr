import { useState } from 'react';


function Analyze() {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [generatedContent, setGeneratedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.src = imageUrl;
    };
    reader.readAsDataURL(file);
    setGeneratedContent('');
  };

  const handleGenerateClick = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    fetch('http://127.0.0.1:5000/api/analyze', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        const entry = { image, content: data }; 
        setGeneratedContent(data);
        setHistory(prevHistory => [...prevHistory, entry]); 
        setLoading(false);
        setImage(null);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <>
    
    <div className="chat-container">
      
      <div className="chat-messages">
      {history.map((entry, index) => (
          <div key={index} className="history-entry">
            <img src={URL.createObjectURL(entry.image)} alt="Uploaded" className="image-preview" />
            <div className="bot-message">{entry.content}</div>
          </div>
        ))}
        {loading && <div className="bot-message">Loading...</div>}
        {response && <div className="bot-message">{response}</div>}
        <div className="image-container">
          {image && <img id="imagePreview" className="image-preview" alt="Uploaded" />}
        </div>
      </div>
      
      <div className="chat-input">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleGenerateClick} disabled={loading || !image}>Generate</button>
      </div>
    </div>
    </>
  );
}

export default Analyze;