import React from 'react';
import truckimg from '../images/truck.png';
import boximg from '../images/cajas.png';
import mapimg from '../images/map.png';
import trackingimg from '../images/tracking-order.png';


export const CardsComponent = () => {
    return(
        <>
        <div className="cards-comp-container">
        <div className="cards-title">
                <h1>Sobre Nosotros</h1>
        </div>
        <div className="cards-container">
            <div className="card">
            <img src={truckimg} alt="Background" />
                <div className="card-content">
                    <h2>Flota</h2>
                    <p className="card-text">Rápidez y eficacia en <br/> la carga y entrega</p>
                </div>
            </div>
            <div className="card">
            <img src={boximg} alt="Background" />
                <div className="card-content">
                    <h2>Paquetes</h2>
                    <p className="card-text">Todo tipo de paquetes <br/>requeridos para transportar.</p>
                </div>
            </div>
            <div className="card">
            <img src={mapimg} alt="Background" />
                <div className="card-content">
                    <h2>Presencia</h2>
                    <p className="card-text">Ofrecemos nuestros servicios <br/> a nivel nacional.</p>
                </div>
            </div>
            <div className="card">
            <img src={trackingimg} alt="Background" />
                <div className="card-content">
                    <h2>Tracking</h2>
                    <p className="card-text">Rastreo disponible del <br/> paquete transportado.</p>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}