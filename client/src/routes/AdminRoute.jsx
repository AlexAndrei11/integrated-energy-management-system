import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);

    return authState.isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
