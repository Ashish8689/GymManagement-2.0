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
