import { GymData } from 'pages/Gym/gym.interface'
import { ActionType } from '../../common.interface'

export interface GymModalProps {
    formData: GymData | Record<string, never>
    actionType: ActionType
    onClose: () => void
    afterClose?: () => void
}
