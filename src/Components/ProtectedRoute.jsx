import React from 'react'
import useAuthStore from '../store/auth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { token, isTokenExpired } = useAuthStore()
    if (!token || isTokenExpired()) {
        return <Navigate to="/loginin" replace />
    }
    return children;
}

export default ProtectedRoute