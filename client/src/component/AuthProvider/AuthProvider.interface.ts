import { UserDetails } from 'pages/Login/login.interface'
import { ReactNode } from 'react'

export interface AuthProviderProps {
    children?: ReactNode
}

export interface AuthProviderContextProps {
    isAdmin: boolean
    isAuthenticated: boolean
    accessToken: string
    userDetails?: UserDetails
    handleLogin: (token: string) => void
    handleLogout: () => void
}
