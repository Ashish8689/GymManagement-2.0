import { Subscription } from 'pages/Subscription/Subscription.interface'

export interface AddSubscriptionProps {
    editSubscriptionData?: Subscription
    onCancel: () => void
    onSuccess: () => void
}
