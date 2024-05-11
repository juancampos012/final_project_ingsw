import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import XIcon from '@mui/icons-material/X';

export const Footer = () => {
    return (
        <div className="footer">
        <div className="footer-section">
            <h3>Get started</h3>
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/signup">Sign up</a></li>
            <li><a href="/login">Log in</a></li>
            </ul>
        </div>
        <div className="footer-section">
            <h3>Company Info</h3>
            <ul>
            <li><a href="/about">About us</a></li>
            <li><a href="/careers">Services</a></li>
            <li>Targets</li>
            </ul>
        </div>
        <div className="footer-section">
            <h3>Support</h3>
            <ul>
            <li>Help</li>
            <li>FAQ</li>
            <li>Forum</li>
            </ul>
        </div>
        <div className="footer-section">
            <h3>Legal</h3>
            <ul>
            <li>Terms of Use</li>
            <li>Legal Information</li>
            <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-map">
        {/*<GoogleMap
        <LoadScript googleMapsApiKey="AIzaSyAf2AHLtGvjMJouKecs0kkw1AQw2YTZfdc">
        <div className='div-map-footer'>  
            id='direction-example'
            mapContainerStyle={{
                height: "23vh",
                width: "95%"
            }}
            zoom={8}
            center={defaultCenter} 
            >
            <Marker position={defaultCenter} />
        </div>
        </LoadScript>
        </GoogleMap>*/}
        </div>
        <div className="footer-social">
            <InstagramIcon className='social-icons'></InstagramIcon>
            <FacebookIcon className='social-icons'></FacebookIcon>
            <XIcon className='social-icons'></XIcon>
        </div>
        </div>
    );
};

