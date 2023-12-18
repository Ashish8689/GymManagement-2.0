import { ACTION_TYPE } from 'constants/action.constants'

export interface AddEquipmentStepperProps {
    actionType: ACTION_TYPE
    category: string
    onSuccess: () => void
}
