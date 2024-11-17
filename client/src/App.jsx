import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Navbar from '../Components/Navbar'; // Ensure the path is correct
import LoadingScreen from '../Pages/LoadingScreen';
import LoginSignup from '../Routes/Signup';
import Home from '../Routes/Home';
import About from '../Routes/About';
import Contact from '../Routes/Contact';
import MainPage from '../SecureBubble/MainPage';
import Auth from '../SecureBubble/Auth';
import AuthRecipient from '../SecureBubble/AuthRecipient';
import ChatRoom from '../SecureBubble/ChatRoom';
import Signup from '../Routes/Signup';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Simulate a loading process
        const loadingTimer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setLoading(false);
            }, 500); // Match this to the CSS transition duration
        }, 2000); // Simulate loading for 2 seconds

        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <Router 
            future={{
                v7_startTransition: true,  // Enable startTransition feature from React Router v7
                v7_relativeSplatPath: true // Enable relative splat path feature from React Router v7
            }}
        >
            <div className={`app ${fadeOut ? 'fade-out' : ''}`}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <Navbar /> {/* Navbar component */}
                        <Routes>
                            {/* Define Route components */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/chat-room" element={<MainPage />} />
                            <Route path="/auth" element={<Auth />} />
                             <Route path="/auth-recipient" element={<AuthRecipient />} />
                            <Route path="/chatroom" element={<ChatRoom />}></Route>
                            <Route path="/login" element={<Signup />} />
                            {/* You can add more routes here */}
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
};

export default App;
