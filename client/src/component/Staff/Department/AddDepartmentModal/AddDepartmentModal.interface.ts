import { ACTION_TYPE } from 'constants/action.constants'

export interface AddDepartmentModalProps {
    actionType: ACTION_TYPE
    initialValues?: any
    onSuccess: () => void
}
