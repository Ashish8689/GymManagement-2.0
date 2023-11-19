import { ACTION_TYPE } from 'constants/action.constants'
import { CategoryData } from 'pages/EquipmentsCategory/equipments.interface'

export interface AddEquipmentsCategoryProps {
    actionType: ACTION_TYPE
    onSuccess: () => void
    initialValues?: CategoryData
}
