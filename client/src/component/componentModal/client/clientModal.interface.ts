import { ClientData } from '../../../interface/client.interface'
import { ActionType } from '../../common.interface'

export interface ClientModalProps {
    formData: ClientData | Record<string, never>
    actionType: ActionType
    onClose: () => void
    afterClose?: () => void
}

export interface PaymentCollector {
    id: string
    label: string
}
