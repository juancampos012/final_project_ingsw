import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import XIcon from '@mui/icons-material/X';

export const Footer = () => {

    const scrollToAbout = () => {
        const aboutElement = document.getElementById("about");
        aboutElement.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="footer">
        <div className="footer-section">
            <h3>Get started</h3>
            <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/signup">Sign up</a></li>
            <li><a href="/login">Log in</a></li>
            </ul>
        </div>
        <div className="footer-section">
            <h3>Company Info</h3>
            <ul>
            <li><Link to="/home" onClick={scrollToAbout}>Sobre Nosotros</Link></li>
            <li>Servicios</li>
            <li>Objetivos</li>
            </ul>
        </div>
        <div className="footer-section">
            <h3>Soporte</h3>
            <ul>
            <li>Ayuda</li>
            <li>FAQ</li>
            <li>Foro</li>
            </ul>
        </div>
        <div className="footer-section">
            <h3>Legal</h3>
            <ul>
            <li>Términos de uso</li>
            <li>Información Legal</li>
            <li>Política de Privacidad</li>
            </ul>
        </div>
        <div className="footer-map">
            {/* <GoogleMap>

            </GoogleMap> */}
        </div>
        <div className="footer-social">
            <InstagramIcon className='social-icons'></InstagramIcon>
            <FacebookIcon className='social-icons'></FacebookIcon>
            <XIcon className='social-icons'></XIcon>
        </div>
        </div>
    );
};

