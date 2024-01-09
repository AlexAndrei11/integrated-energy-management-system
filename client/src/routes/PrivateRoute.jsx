import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const { userId } = useParams();

    // Convert authState.userId to a string for comparison
    const isAuthorized = authState.userId.toString() === userId;

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
