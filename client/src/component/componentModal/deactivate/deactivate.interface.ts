import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'constants/common.constant'

export interface DeactivateModalProps {
    id: string
    entity: ENTITY_TYPE
    actionType: ACTION_TYPE
    api?: (id: string) => Promise<void>
}
