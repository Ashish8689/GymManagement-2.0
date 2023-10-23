import { ENTITY_TYPE } from 'constants/add-stepper.constant'

export interface AddPersonDetailStepperProps {
    open: boolean
    entityType: ENTITY_TYPE
    closeModal: () => void
    onSuccess: () => void
}
