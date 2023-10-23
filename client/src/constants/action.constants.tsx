import {
    DeleteOutlined,
    DollarCircleOutlined,
    EditOutlined,
} from '@ant-design/icons'
import { MenuItems } from 'component/ActionMenu/ActionMenu.interface'
import i18n from 'component/utils/i18next/LocalUtils'

export enum ACTION_TYPE {
    EDIT = 'edit',
    DE_ACTIVATE = 'deactivate',
    SUBSCRIBE = 'subscribe',
}

export const actionMenuDefaultValues: Record<ACTION_TYPE, MenuItems> = {
    edit: {
        icon: <EditOutlined />,
        text: i18n.t('label.edit'),
    },
    deactivate: {
        icon: <DeleteOutlined />,
        text: i18n.t('label.deactivate'),
    },
    subscribe: {
        icon: <DollarCircleOutlined />,
        text: i18n.t('label.subscribe'),
    },
}
