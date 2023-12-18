export interface EquipmentCategoryData {
    data: Category[]
    isLoading: boolean
}

export interface Category {
    _id: string
    category: string
    description: string
}
