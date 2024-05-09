import React from 'react';
import { useNavigate } from 'react-router-dom';


export const WelcomeComponent = () => {

    const [username, setUsername] = React.useState("");

    return(
        <>
        <div className="carousel-container">
        <div className="banner">
            <img className="banner-image" src="https://i.pinimg.com/originals/bc/45/60/bc4560e33f571328e31679e2116141e7.jpg" alt="Scenic view" />
            <div className="banner-content">
                <h1 className="banner-title">Entregando el mundo a tu puerta</h1>
                <p className="banner-subtitle">Soluciones de logística, servicio de seguimiento de carga <br/> Entregas urgentes para cuando el tiempo es esencial </p>
                <button className="banner-button">Sobre nosotros</button>
            </div>
        </div>
            
            
        </div>
        </>
    )
}