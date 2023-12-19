import { Category } from '../Category/category.interface'

export interface Equipment {
    _id: string
    equipment: string
    description?: string
    category: Category
    dateOfPurchase: Date
    quantity: number
    costPerItem: number
    discount: number
    totalCost: number
    vendor: string
    vendorContact: string
}
