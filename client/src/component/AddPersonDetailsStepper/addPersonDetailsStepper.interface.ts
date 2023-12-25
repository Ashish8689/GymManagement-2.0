import { ENTITY_TYPE } from 'enums/common.enums'

export interface AddPersonDetailStepperProps {
    open: boolean
    entityType: ENTITY_TYPE
    closeModal: () => void
    onSuccess: () => void
}
