import { useState, useEffect } from 'react';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = () => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/api/get_chat_history')
      .then(response => response.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          {history.map((entry, index) => (
            <div key={index} className="history-entry">
              <img src={`data:image/png;base64,${entry.image}`} id={`imagePreview-${index}`} alt="Uploaded" className="image-preview" />
              <div className="bot-message">{entry.response}</div>
            </div>
          ))}
          {loading && <div className="bot-message">Loading...</div>}
        </div>
      </div>
    </>
  );
}

export default History;
