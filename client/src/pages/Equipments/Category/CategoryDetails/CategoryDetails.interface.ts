import { Equipment } from 'pages/Equipments/Equipment/Equipment.interface'
import { Category } from '../category.interface'

export interface CategoryDetails {
    data?: Category
    isLoading: boolean
}

export interface EquipmentListData {
    data: Equipment[]
    isLoading: boolean
}
