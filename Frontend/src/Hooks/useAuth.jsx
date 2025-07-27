import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import { checkUserAuth } from '../Service/userAuthenticationService';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token')

    useEffect(() => {
        checkUserAuth(token, setLoading, setIsAuthenticated)
    }, [])
    return { isAuthenticated, loading }
}

export default useAuth
