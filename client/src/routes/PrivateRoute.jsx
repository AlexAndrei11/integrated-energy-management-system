// src/routes/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Route, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const PrivateRoute = ({ children, ...rest }) => {
    const { authState } = useContext(AuthContext);
    const userId = rest.path.split('/')[2]; // Assuming the path is like '/user-devices/:userId'

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authState.userId === userId ? (
                    children
                ) : (
                    <Navigate to="/login" state={{ from: location }} />
                )
            }
        />
    );
};

export default PrivateRoute;
