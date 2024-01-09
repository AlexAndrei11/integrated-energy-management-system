import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ token: null, userId: null });

    const setAuthInfo = ({ token, userId }) => {
        setAuthState({ token, userId });
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
