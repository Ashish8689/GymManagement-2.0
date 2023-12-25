import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'enums/common.enums'

export interface DeactivateModalProps {
    id: string
    entity: ENTITY_TYPE
    actionType: ACTION_TYPE
    api?: (id: string) => Promise<void>
}
