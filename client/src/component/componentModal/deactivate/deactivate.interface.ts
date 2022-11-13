import { ActionType } from '../../common.interface'

export interface DeactivateModalProps {
    id: string
    actionType: ActionType
    onClose: () => void
    afterClose?: () => void
    api?: (id: string) => Promise<void>
}
