import { ACTION_TYPE } from 'constants/action.constants'
import { TrainerData } from '../../../interface/trainer.interface'

export interface TrainerModalProps {
    formData: TrainerData | Record<string, never>
    actionType: ACTION_TYPE
    onClose: () => void
    afterClose?: () => void
}
