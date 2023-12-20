import { ACTION_TYPE } from 'constants/action.constants'

export interface AddStaffModalProps {
    actionType: ACTION_TYPE
    initialValues?: any
    onSuccess: () => void
}
