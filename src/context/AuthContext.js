"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // To keep it simple for now, we'll hardcode allowed admin emails
                // In a full production app, you might use Custom Claims or a Firestore 'admins' collection
                const adminEmails = ['admin@nexstepeurope.de', 'amalchand@gmail.com'];
                setUser({
                    ...user,
                    isAdmin: adminEmails.includes(user.email?.toLowerCase())
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
