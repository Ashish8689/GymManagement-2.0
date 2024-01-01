import { ENTITY_TYPE } from 'enums/common.enums'
import { TrainerData } from 'interface/trainer.interface'
import { ClientData } from 'pages/Client/client.interface'

export interface AddPersonDetailStepperProps {
    entityType: ENTITY_TYPE
    initialValues?: ClientData | TrainerData
    onSuccess: () => void
}
