export interface EquipmentCategoryData {
    data: CategoryData[]
    isLoading: boolean
}

export interface CategoryData {
    _id: string
    categoryName: string
    imageUrl: number
    description: string
}
