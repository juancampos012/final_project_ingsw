import { Navigate } from 'react-router-dom';
import { User } from '../../request/users';
import React from 'react';
import Cookies from 'js-cookie';

const userController = new User();

const RequireAuth =  ({ children }) => {
    const miCookie = Cookies.get('jwt');
    const [status, setStatus] = React.useState(null); 
    const [loading, setLoading] = React.useState(true); 

    React.useEffect(() => {
        userController.verifyToken(miCookie)
        .then(data => {
            setStatus(data.status);
            setLoading(false);
        }).catch(error => {
            console.error(error); 
            setLoading(false); 
        });
    }, [miCookie]); 

    if (loading) {
        return null; 
    } else if (status === 401) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;