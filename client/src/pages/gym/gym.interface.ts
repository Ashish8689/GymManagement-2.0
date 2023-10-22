export interface GymData {
    _id: string
    gymCode: number
    gymName: string
    dateOfJoining: Date
    ownerName: string
    mobile: number
    altMobile?: number
    isActive: boolean
    address: string
    email?: string
}

export interface GymCode {
    gymCode: number
}

export interface GymPageData {
    data: GymData[]
    isLoading: boolean
}
