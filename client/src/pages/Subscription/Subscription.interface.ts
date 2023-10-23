export interface Subscription {
    _id: string
    name: string
    description: string
    price: number
    duration: number
}

export interface SubscriptionPageData {
    data: Subscription[]
    isLoading: boolean
}
