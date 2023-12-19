import { ACTION_TYPE } from 'constants/action.constants'
import { GymData } from 'pages/Gym/gym.interface'

export interface GymModalProps {
    actionType: ACTION_TYPE
    initialValues?: GymData
    onClose: () => void
    afterClose?: () => void
}
