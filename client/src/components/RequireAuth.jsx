import { Navigate } from 'react-router-dom';
import React from 'react';
import Cookies from 'js-cookie';

const RequireAuth = ({ children, token }) => {
    const miCookie = Cookies.get('jwt');
    console.log(miCookie);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;
