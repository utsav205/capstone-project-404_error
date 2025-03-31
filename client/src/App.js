import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/message')
      .then((response) => {
        setMessage(response.data.text);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/message', { text: newMessage })
      .then((response) => {
        setMessages([...messages, response.data.data]);
        setNewMessage('');
        setError('');
      })
      .catch((err) => {
        setError('Failed to add message. Please try again.');
        console.error('There was an error!', err);
      });
  };

  const handleUpdate = (id, newText) => {
    axios.put(`http://localhost:5000/api/message/${id}`, { text: newText })
      .then((response) => {
        const updatedMessages = messages.map((message) =>
          message._id === id ? { ...message, text: newText } : message
        );
        setMessages(updatedMessages);
      })
      .catch((err) => {
        setError('Failed to update message. Please try again.');
        console.error('There was an error!', err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/message/${id}`)
      .then(() => {
        setMessages(messages.filter((message) => message._id !== id));
      })
      .catch((err) => {
        setError('Failed to delete message. Please try again.');
        console.error('There was an error!', err);
      });
  };

  return (
    <div className="App">
      <h1>Current Message: {message}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          placeholder="Type a new message"
        />
        <button type="submit">Add Message</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="message-container">
        {messages.map((message) => (
          <div key={message._id} className="message-box">
            <p className="message-text">{message.text}</p>
            <div>
              <button
                className="update"
                onClick={() => {
                  const newText = prompt('Enter new message text:', message.text);
                  if (newText) handleUpdate(message._id, newText);
                }}
              >
                Update
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(message._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;