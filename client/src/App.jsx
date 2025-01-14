import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [htmlBody, setHtmlBody] = useState('');
  // const [attachments, setAttachments] = useState([]);

  const handleSubmit = async () => {
    try {
      const sendRequest = await axios.post('http://localhost:5000/emails/send', {
        to, subject, body, htmlBody
      });
      console.log('Email sent successfully:', sendRequest.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Send Email</h1>
      <div className='form'>
        <div>
          <label>To:</label>
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <div>
          <label>HTML Body:</label>
          <textarea value={htmlBody} onChange={(e) => setHtmlBody(e.target.value)} />
        </div>
        {/* <div>
          <label>Attachments:</label>
          <input type="file" multiple onChange={(e) => setAttachments(Array.from(e.target.files))} />
        </div> */}
        <button onClick={handleSubmit}>Send Email</button>
      </div>
    </div>
  );
}

export default App;