import { GymData } from 'pages/gym/gym.interface'
import { ActionType } from '../../common.interface'

export interface GymModalProps {
    formData: GymData | Record<string, never>
    actionType: ActionType
    onClose: () => void
    afterClose?: () => void
}
