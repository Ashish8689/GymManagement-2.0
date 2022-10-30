import { ReactNode } from 'react'
import { MenuInfo } from 'rc-menu/lib/interface'

export interface ActionMenuProps {
    data?: any
    items: ActionItem[]
    onClick: (name: string, data: any) => void
    afterClose: () => void
}

export interface ActionItem {
    type: string
    actionType: ActionType
    api?: (id: string) => Promise<void>
}

export interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
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
