import React from 'react';
import '../Stylesheets/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to AnomX</h1>
        <p className="welcome-text">
          Experience the freedom of anonymous chat, where your privacy is our priority.
        </p>
        
        <button className="get-started-button">Get Started</button>
      </div>
      <div className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>🔒 Privacy First</h3>
            <p>Enjoy secure and private conversations.</p>
          </div>
          <div className="feature-item">
            <h3>💬 Instant Messaging</h3>
            <p>Connect instantly with friends and strangers.</p>
          </div>
          <div className="feature-item">
            <h3>🌍 Global Reach</h3>
            <p>Chat with people from around the world.</p>
          </div>
          <div className="feature-item">
            <h3>🎨 Customization</h3>
            <p>Personalize your chat experience with themes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
