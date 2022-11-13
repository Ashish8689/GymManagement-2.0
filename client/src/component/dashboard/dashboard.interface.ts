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
