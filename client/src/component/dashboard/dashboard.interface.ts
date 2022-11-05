export interface DashboardStatus {
    name: string
    value: number
    keys: string
    dotColor: string
}
export interface Stats {
    clientsActive: number
    clientsInActive: number
    totalClients: number
    totalTrainers: number
}

export type StatsType =
    | 'clientsActive'
    | 'clientsInActive'
    | 'totalClients'
    | 'totalTrainers'
