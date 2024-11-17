import React from 'react';
import '../Stylesheets/About.css';  // Importing the external CSS file
import aboutImage from  '../public/Images/about.svg';  // Importing the SVG image'

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1 className="about-heading">About</h1>
                <p className="about-description">
                    At Anom, we believe in a world where trust can be rebuilt in conversations, free from the fear of exposure.
                </p>
            </div>
            <div className="mission-card">
                <h2 className="mission-heading">Our Mission</h2>
                <img 
                    src={aboutImage} 
                    alt="Illustration of people collaborating on digital platforms" 
                    className="mission-image"
                />
                <p className="mission-description">
                    Anom’s mission is to redefine trust in a digital age rife with doubt. We empower connections where every word and file shared vanish without a trace, ensuring privacy without compromise. Anom isn’t just a platform—it’s a movement to restore trust, blending authenticity with cutting-edge technology to keep your conversations truly yours.
                </p>
            </div>
        </div>
    );
};

export default About;
