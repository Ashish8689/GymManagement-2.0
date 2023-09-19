import { ReactNode } from 'react'

export interface AuthProviderProps {
    children?: ReactNode
}

export interface AuthProviderContextProps {
    isAdmin: boolean
    isAuthenticated: boolean
    accessToken: string
    handleLogin: (token: string) => void
    handleLogout: () => void
}
