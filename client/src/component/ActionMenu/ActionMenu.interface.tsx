import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'constants/common.constant'
import { MenuInfo } from 'rc-menu/lib/interface'
import { ReactNode } from 'react'

export interface ActionMenuProps {
    id: string
    entity: ENTITY_TYPE
    items: ActionMenuItem[]
    onClick: (type: ACTION_TYPE) => void
}

export interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
}

export interface ActionMenuItem {
    type: ACTION_TYPE
    api?: (id: string) => Promise<void>
}
export interface MenuItems {
    icon: ReactNode
    label: string
}

export interface ActionMenuItems {
    label: string
    icon: ReactNode
    key: string
    onClick: ({ key, domEvent }: MenuInfo) => void
}
