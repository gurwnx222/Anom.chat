import React, { useEffect, useState } from 'react';
import '../Stylesheets/LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        const loadingInterval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev < 100) {
                    return prev + 10;
                } else {
                    clearInterval(loadingInterval);
                    return prev;
                }
            });
        }, 600); // Adjusting to fill in 3 seconds

        return () => clearInterval(loadingInterval);
    }, []);

    useEffect(() => {
        if (loadingProgress === 100) {
            onLoadingComplete();
        }
    }, [loadingProgress, onLoadingComplete]);

    return (
        <div className="loading-screen">
            <h1 style={{ color: '#4619E1' , fontSize: '3rem',fontFamily:'Franklin Gothic Medium', fontWeight: 'bold' }}>ANOM</h1>
            <p className="subtitle">Secure, Anonymous, Private</p>
            <div className="loading-number" style={{ color: 'white' }}>
                {loadingProgress}%
            </div>
        </div>
    );
};

export default LoadingScreen;
