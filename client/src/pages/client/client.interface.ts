import { StatusCardDetails } from 'component/StatusCard/StatusCard.interface'

export interface ClientData {
    _id: string
    clientCode: number
    name: string
    age: number
    email: string
    mobile: number
    isActive: boolean
    address: string
    dateOfJoining: string
    membershipEnding: string
    altMobile: number
    membership: number
    membershipHistory: ClientMembershipHistory[]
}

export interface ClientMembershipHistory {
    id: number
    membership: number
    paymentCollector: string
    paymentMethod: string
    endDate: Date
    paymentDate: Date
    transactionId?: string
}

export interface ClientDataDashboard {
    clientCode: number
    name: string
    email: string
    mobile: number
    membershipEnding: string
    membership: number
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

export interface ClientCode {
    clientCode: number
}

export interface ClientStats {
    totalClients: number
    activeClients: number
    inActiveClients: number
    clientsJoin: number
}

export type ClientStatsType =
    | 'totalClients'
    | 'activeClients'
    | 'inActiveClients'
    | 'clientsJoin'

export interface ClientPageData {
    data: ClientData[]
    isLoading: boolean
}

export interface ClientPageStats {
    isLoading: boolean
    stats: StatusCardDetails[]
}
