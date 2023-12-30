export interface Staff {
    _id: string
    employeeCode: string
    name: string
    email: string
    mobile: string
    address: string
    gender: string
    dateOfBirth: string
    isActive: boolean
    maritalStatus: string
    dateOfJoining: string
    department: string
    sourceOfHire: string
    addedBy: string
    createdAt: string
    updatedAt: string
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

export interface StaffCategoryData {
    category: string
    details: {
        label: string
        value: string
    }[]
}
