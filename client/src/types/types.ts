export interface DashboardStatus {
    name: string
    number: number
    dotColor: string
}

export interface ClientColumn {
    title: string
    dataIndex: string
    key: string
    width: number
    ellipsis: boolean
    fixed: string
    render?: () => void | undefined
}

export interface ClientData {
    id: number
    key?: number
    name: string
    age: number
    email: string
    mobile: number
    status: boolean
    address: string
    dateOfJoining: string
    membershipEnding: string
    altMobile: number
    membership: number
}

export interface ClientMembershipData {
    id: number
    name: string
    age: number
    email: string
    mobile: number
    status: boolean
    address: string
    dateOfJoining: string
    membershipEnding: string
    altMobile: number
    membership: number
}

export interface ClientDataDashboard {
    id: number
    name: string
    email: string
    mobile: number
    membershipEnding: string
    membership: number
}

export interface TrainerData {
    id: number
    name: string
    age: number
    email: string
    mobile: number
    status: boolean
    address: string
    dateOfJoining: string
    altMobile: number
}
