import { ACTION_TYPE } from 'constants/action.constants'
import { MenuInfo } from 'rc-menu/lib/interface'
import { ReactNode } from 'react'

export interface ActionMenuProps {
    id: string
    items: ActionMenuItem[]
    onClick: (type: ACTION_TYPE) => void
    afterClose: () => void
}

export interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
}

export interface ActionMenuItem {
    type: ACTION_TYPE
    actionType: ActionType
    api?: (id: string) => Promise<void>
}
export interface MenuItems {
    icon: ReactNode
    text: string
}

export interface ActionMenuItems {
    label: string
    icon: ReactNode
    key: string
    onClick: ({ key, domEvent }: MenuInfo) => void
}
