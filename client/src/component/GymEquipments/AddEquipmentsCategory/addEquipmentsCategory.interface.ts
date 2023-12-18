import { ACTION_TYPE } from 'constants/action.constants'
import { Category } from 'pages/Equipments/Category/category.interface'

export interface AddEquipmentsCategoryProps {
    actionType: ACTION_TYPE
    onSuccess: () => void
    initialValues?: Category
}
