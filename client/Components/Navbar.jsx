import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <div className="logo">Anom</div>
                </div>
                <div className="hamburger-menu">
                    <div className="menu-toggle" onClick={toggleMenu}>
                        <span className={`bar top ${isOpen ? 'open' : ''}`}></span>
                        <span className={`bar middle ${isOpen ? 'open' : ''}`}></span>
                        <span className={`bar bottom ${isOpen ? 'open' : ''}`}></span>
                    </div>
                </div>
                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        <li className='home'><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                           <li className='chatroom'><Link to="/chat-room"  onClick={toggleMenu}>Secure Bubble</Link></li>
                        <li className='logsign'><Link to="/login" className="login-link" onClick={toggleMenu}>Login/Signup</Link></li>
                      
                        
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
