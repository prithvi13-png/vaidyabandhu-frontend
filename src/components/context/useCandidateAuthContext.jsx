
import { createContext, useContext, useState, useEffect } from 'react'

const CandidateAuthContext = createContext()

export const CandidateAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('authCandidateToken')
        
        
        setIsAuthenticated(!!token) // Set authentication status based on token
    }, [])

    const logout = () => {
        localStorage.removeItem('authCandidateToken')
        setIsAuthenticated(false)
        window.location.href = '/candidate/login' // Redirect to login page
    }

    const checkISAuthenticated = () => {
        const token = localStorage.getItem('authCandidateToken')
        if (token) {
            return true
        } else {
            return false
        }
    }

    return (
        <CandidateAuthContext.Provider
            value={{ isAuthenticated, logout, checkISAuthenticated }}
        >
            {children}
        </CandidateAuthContext.Provider>
    )
}

export const useCandidateAuthContext = () => useContext(CandidateAuthContext)
