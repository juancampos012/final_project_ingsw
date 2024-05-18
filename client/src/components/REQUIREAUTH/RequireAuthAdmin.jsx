import { Navigate } from 'react-router-dom';
import { User } from '../../request/users';
import React from 'react';
import Cookies from 'js-cookie';

const userController = new User();

const RequireAuthAdmin = ({ children }) => {
    const miCookie = Cookies.get('jwt');
    const [status, setStatus] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [role, setRole] = React.useState("");

    React.useEffect(() => {
        if (!miCookie) {
            setStatus(401);
            setLoading(false);
            return;
        }

        userController.verifyToken(miCookie)
            .then(response => response.json())
            .then(data => {
                setStatus(data.status);
                if (data.user) {
                    setRole(data.user.user.role);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setStatus(401);
                setLoading(false);
            });
    }, [miCookie]);

    if (loading) {
        return null;
    }
    if (status === 401 || role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return children;
};

export default RequireAuthAdmin;
