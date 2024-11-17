import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../Stylesheets/Contactus.css';

const Contactus = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (status) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        setStatus('');
      }, 3000); // Hide popup after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      email,
      message,
    };

    // Show sending state
    setStatus('Sending...');
    setShowPopup(true);
    setIsSuccess(false);

    emailjs.send('service_rdaqemf', 'template_npr4rpk', templateParams, 'TEltAbvn6OcwCZ6td')
      .then(() => {
        setStatus('Message sent successfully! 🎉');
        setIsSuccess(true);
        setEmail('');
        setMessage('');
      })
      .catch(() => {
        setStatus('Error sending message. Please try again later. ❌');
        setIsSuccess(false);
      });
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2 className="contact-title">Contact Us</h2>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="contact-input"
        />
        <textarea
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="contact-textarea"
        />
        <button type="submit" className="contact-button">
          Send
        </button>
      </form>

      {showPopup && (
        <div className={`popup-notification ${isSuccess ? 'success' : 'error'}`}>
          <div className="popup-content">
            <div className="popup-icon">
              {isSuccess ? '✨' : '❌'}
            </div>
            <p className="popup-message">{status}</p>
            <div className="popup-progress"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contactus;