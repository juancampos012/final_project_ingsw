import { Navigate } from 'react-router-dom';
import { User } from '../request/users';
import React from 'react';
import Cookies from 'js-cookie';

const userController = new User();

const RequireAuth =  ({ children }) => {
    const miCookie = Cookies.get('jwt');
    const [status, setStatus] = React.useState(""); 
    userController.verifyToken(miCookie)
    .then(data => {
        setStatus(data.status);
    }).catch(error => {
        console.error(error); 
    });
    
    if (status === 401) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;
