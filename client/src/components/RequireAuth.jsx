import { Navigate } from 'react-router-dom';
import React from 'react';

const RequireAuth = ({ children, token }) => {
    console.log(token);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;
