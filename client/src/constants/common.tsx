import { ActionMenuDefaultValues } from '../component/ActionMenu/ActionMenu.interface'
import {
    DeleteOutlined,
    DollarCircleOutlined,
    EditOutlined,
} from '@ant-design/icons'

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
