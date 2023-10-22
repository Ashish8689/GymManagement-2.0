export interface StatusCardDetails {
    name: string
    value: number
    keys: string
    dotColor: string
    isLoading?: boolean
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
