import { TrainerData } from '../../../interface/trainer.interface'
import { ActionType } from '../../common.interface'

export interface TrainerModalProps {
    formData: TrainerData | Record<string, never>
    actionType: ActionType
    onClose: () => void
    afterClose?: () => void
}
