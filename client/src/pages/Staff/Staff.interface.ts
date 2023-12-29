export interface Staff {
    _id: string
    name: string
    email: string
    mobile: string
    address: string
    dateOfBirth: Date
    isActive: boolean
    maritalStatus: string
    dateOfJoining: Date
    department: string
    sourceOfHire: string
    addedBy: string
    createdAt: Date
    updatedAt: Date
    updatedBy: string
}

export interface StaffDepartment {
    _id: string
    department: string
}

export interface StaffState {
    data: Staff[]
    isLoading: boolean
}

export interface StaffProfileState {
    data?: Staff
    isError: boolean
    isLoading: boolean
}
