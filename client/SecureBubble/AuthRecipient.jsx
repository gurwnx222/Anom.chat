import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const AuthRecipient = () => {
  const { token } = useParams();  // Get the token from the URL
  const location = useLocation();  // To access the displayName in the query string
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const displayNameParam = queryParams.get('displayName');
    if (displayNameParam) {
      setDisplayName(displayNameParam);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsEmailValid(true);
  };

  const handleEnterChat = () => {
    navigate('/chatroom'); // Pass displayName to ChatRoom
  };

  return (
    <div className="auth-container">
      <h1>Welcome {displayName}!</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            disabled
          />
        </div>

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

        <button type="submit">Submit</button>
        {error && <div className="error-message">{error}</div>}
      </form>

      {isEmailValid && (
        
      <Link to='/chatroom'>
        <button onClick={handleEnterChat} className="enter-chatroom-btn">
          Enter the Chatroom
        </button> 
      </Link>
      )}
    </div>
  );
};

export default AuthRecipient;
