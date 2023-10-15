import {
    DeleteOutlined,
    DollarCircleOutlined,
    EditOutlined,
} from '@ant-design/icons'
import { t } from 'i18next'
import { ActionMenuDefaultValues } from '../component/ActionMenu/ActionMenu.interface'

export const ERROR_500 = t('message.something-went-wrong')

export const actionMenuDefaultValues: ActionMenuDefaultValues = {
    edit: {
        icon: <EditOutlined />,
        text: 'Edit',
    },
    deactivate: {
        icon: <DeleteOutlined />,
        text: 'Deactivate',
    },
    subscribe: {
        icon: <DollarCircleOutlined />,
        text: 'Subscribe',
    },
}

export const ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
}
