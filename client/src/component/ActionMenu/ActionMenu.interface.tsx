import { ReactNode } from 'react'
import { MenuInfo } from 'rc-menu/lib/interface'

export interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
}

export interface ActionSet {
    type: string
    actionType: ActionType
}

export interface ActionMenuProps {
    data?: any
    items: ActionSet[]
    onClick: (name: string, data: any) => void
}

export interface MenuItems {
    icon: ReactNode
    text: string
}

export interface ActionMenuDefaultValues {
    [code: string]: MenuItems
}

export interface ActionMenuItems {
    label: string
    icon: ReactNode
    key: string
    onClick: ({ key, domEvent }: MenuInfo) => void
}
