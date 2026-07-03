import React, { useEffect, useState } from 'react';
import './GlobalLoader.css';

const GlobalLoader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleShow = () => setIsLoading(true);
        const handleHide = () => setIsLoading(false);

        window.addEventListener('showLoader', handleShow);
        window.addEventListener('hideLoader', handleHide);

        return () => {
            window.removeEventListener('showLoader', handleShow);
            window.removeEventListener('hideLoader', handleHide);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div className="global-loader-overlay">
            <div className="global-loader-container">
                <div className="cube-wrapper">
                    <div className="cube-folding">
                        <span className="leaf1"></span>
                        <span className="leaf2"></span>
                        <span className="leaf3"></span>
                        <span className="leaf4"></span>
                    </div>
                    <span className="loading-text" data-name="Processando">Processando</span>
                </div>
            </div>
        </div>
    );
};

export default GlobalLoader;
