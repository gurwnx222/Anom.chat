import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';  // Ensure Link is imported
import '../Stylesheets/Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [sharedEmail, setSharedEmail] = useState('');
  const [authLink, setAuthLink] = useState('https://your-auth-link.com');  // Replace with your auth link
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [error, setError] = useState('');
  const [sendMethod, setSendMethod] = useState('email'); // Track the selected send method

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation for email and display name
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!displayName.trim()) {
      setError('Please enter your display name.');
      return;
    }

    if (!sharedEmail || !sharedEmail.includes('@')) {
      setError('Please enter a valid email for the recipient.');
      return;
    }

    if (sendMethod === 'email') {
      // Send email using EmailJS
      const templateParams = {
        recipient_email: sharedEmail,   // Send only to recipient email
        sender_name: displayName,       // Sender's name
        auth_link: authLink,            // The authentication link
      };

      // Call EmailJS with the correct service and template ID
      emailjs
        .send('service_1eba5rt', 'template_mih3ouk', templateParams, 'lLx8xJTChrkOeKGdv') // Use custom service and template IDs
        .then(
          (response) => {
            console.log('Email successfully sent!', response.status, response.text);
            setIsLinkSent(true);  // Set isLinkSent to true to show the button
          },
          (error) => {
            console.error('Failed to send email.', error);
            setError('There was an error sending the email. Please try again.');
          }
        );
    }
  };

  const handleEnterChat = () => {
    navigate('/chatroom'); // Pass displayName to ChatRoom
  };

  const handleWhatsApp = () => {
    const whatsappMessage = `Hello, I've generated your authentication link: ${authLink}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp URL
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="auth-container">
      <h1>Authentication Form</h1>
      {isLinkSent ? (
        <div className="success-message">
          <p>We’ve generated your authentication link! The link has been sent to {sharedEmail}.</p>

          {/* Display the "Enter the Chatroom" button after the email is successfully sent */}
          <Link to="/chatroom">
            <button onClick={handleEnterChat}>
              Enter the Chatroom
            </button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Send method selection */}
          <div className="send-method">
            <label>How would you like to send the link?</label>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  value="email"
                  checked={sendMethod === 'email'}
                  onChange={() => setSendMethod('email')}
                />
                Send via Email
              </label>
              <label>
                <input
                  type="radio"
                  value="whatsapp"
                  checked={sendMethod === 'whatsapp'}
                  onChange={() => setSendMethod('whatsapp')}
                />
                Send via WhatsApp
              </label>
            </div>
          </div>

          {/* Conditionally render form based on send method */}
          {sendMethod === 'email' && (
            <>
              <div className="input-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="sharedEmail">Share with Another User</label>
                <input
                  type="email"
                  id="sharedEmail"
                  value={sharedEmail}
                  onChange={(e) => setSharedEmail(e.target.value)}
                  placeholder="Enter email of the person you want"
                  required
                />
              </div>

              <button type="submit">Send Authentication Link via Email</button>
            </>
          )}

          {/* WhatsApp-specific fields */}
          {sendMethod === 'whatsapp' && (
            <>
              <div className="input-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="sharedEmail">Your Email-Id</label>
                <input
                  type="email"
                  id="sharedEmail"
                  value={sharedEmail}
                  onChange={(e) => setSharedEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>

              <button type="button" onClick={handleWhatsApp}>
                Send Authentication Link via WhatsApp
              </button>
            </>
          )}

          {error && <div className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default Auth;
