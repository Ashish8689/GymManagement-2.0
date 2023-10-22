import { ClientData } from 'pages/client/client.interface'

export interface DashboardStats {
    // totalGyms: number
    clients: number
    trainers: number
    equipments: number
    clientsJoin: number
}

export type DashboardStatsType =
    | 'trainers'
    | 'equipments'
    | 'clients'
    | 'clientsJoin'

export interface DashboardTable {
    data: ClientData[]
    isLoading: boolean
}
