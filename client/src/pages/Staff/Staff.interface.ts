export interface Staff {
    id: number
    name: string
    email: string
    phone: string
    address: string
    role: string
    created_at: string
    updated_at: string
}

export interface StaffDepartment {
    _id: string
    name: string
}

export interface StaffState {
    data: Staff[]
    isLoading: boolean
}
