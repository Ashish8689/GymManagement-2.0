import { ClientData } from '../../../types/clientTypes'
import { ActionType } from '../../common.interface'

export interface ClientModalProps {
    formData: ClientData | Record<string, never>
    actionType: ActionType
    onClose: () => void
    afterClose?: () => void
}