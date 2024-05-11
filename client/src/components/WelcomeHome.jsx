import React from 'react';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

export const WelcomeComponent = () => {

    const scrollToAbout = () => {
        const aboutElement = document.getElementById("about");
        aboutElement.scrollIntoView({ behavior: "smooth" });
    };
    
    return(
        <>
        <div className="carousel-container">
        <div className="banner">
            <img className="banner-image" src="https://i.pinimg.com/originals/bc/45/60/bc4560e33f571328e31679e2116141e7.jpg" alt="Scenic view" />
            <div className="banner-content">
                <h1 className="banner-title">Entregando el mundo a tu puerta</h1>
                <p className="banner-subtitle">Soluciones de logística, servicio de seguimiento de carga <br/> Entregas urgentes para cuando el tiempo es esencial </p>
                <Link to="/home">
                    <button className="banner-button" onClick={scrollToAbout}>Sobre nosotros</button>
                </Link>            
            </div>
        </div>
        </div>
        </>
    )
}