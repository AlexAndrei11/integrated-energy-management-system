import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ token: null, userId: null, isAdmin: false });

    const setAuthInfo = ({ token, userId, isAdmin }) => {
        setAuthState({ token, userId, isAdmin });
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
