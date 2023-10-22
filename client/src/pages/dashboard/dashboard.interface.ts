export interface Dashboard {
    stats: {
        value: number
        name: string
        keys: string
        dotColor: string
    }[]
    isLoading: boolean
}
