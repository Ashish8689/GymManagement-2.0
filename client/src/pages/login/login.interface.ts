export interface TokenDetails {
    exp: number | undefined
    isExpired: boolean | undefined | number
    diff: number | undefined
    timeoutExpiry: number
    data: UserDetailsToken
}

export interface UserDetailsToken {
    role: string
    username: string
    email: string
    dateOfJoining: Date
    isActive: boolean
}

export interface UserDetails extends UserDetailsToken {
    isAdmin: boolean
}

export interface LoginDataProps {
    email: string
    password: string
}

export interface LoginResponseDataProps {
    token: string
}

export interface LoginPayload {
    username: string
    password: string
}

export interface AccessTokenResponse {
    // refreshToken: string
    token: string
}
