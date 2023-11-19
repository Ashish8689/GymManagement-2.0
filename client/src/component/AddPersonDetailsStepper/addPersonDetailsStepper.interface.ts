import { ENTITY_TYPE } from 'constants/common.constant'

export interface AddPersonDetailStepperProps {
    open: boolean
    entityType: ENTITY_TYPE
    closeModal: () => void
    onSuccess: () => void
}
