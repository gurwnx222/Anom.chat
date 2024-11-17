import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import "../Stylesheets/MainPage.css";

const MainPage = () => {
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleClick = () => {
        setIsFading(true); // Trigger fade-out effect
        setTimeout(() => {
            navigate('/auth'); // Navigate to /auth after delay
        }, 500); // Delay the navigation to match the fade-out animation time
    };

    return (
        <div className="page-wrapper">
            <div className="content-container">
                {/* Decorative elements */}
                <div className="glow-element glow-primary"></div>
                <div className="glow-element glow-secondary"></div>

                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">Your Privacy Matters</h1>
                    <p className="hero-description">
                        Experience secure, private conversations with end-to-end encryption 
                        and zero-knowledge architecture.
                    </p>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="features-title">Security. Privacy. Trust.</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <h3 className="feature-subtitle">End-to-End Encryption</h3>
                            <p className="features-description">
                                Your messages are protected with military-grade encryption. 
                                Only you and your intended recipient can read them.
                            </p>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-subtitle">No Data Storage</h3>
                            <p className="features-description">
                                Messages disappear after being delivered. We don't store 
                                any of your conversations on our servers.
                            </p>
                        </div>
                        <div className="feature-item">
                            <h3 className="feature-subtitle">Anonymous Communication</h3>
                            <p className="features-description">
                                Chat freely without sharing personal information. 
                                Your identity remains protected at all times.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Action Section with Smooth Transition */}
                <section className={`action-section ${isFading ? 'fade-out' : ''}`}>
                    <button onClick={handleClick} className="primary-button">
                        Get Started
                    </button>
                </section>
            </div>
        </div>
    );
}

export default MainPage;
