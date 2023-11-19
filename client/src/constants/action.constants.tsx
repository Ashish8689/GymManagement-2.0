import {
    DeleteOutlined,
    DollarCircleOutlined,
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import { MenuItems } from 'component/ActionMenu/ActionMenu.interface'
import i18n from 'component/utils/i18next/LocalUtils'

export enum ACTION_TYPE {
    ADD = 'add',
    EDIT = 'edit',
    DE_ACTIVATE = 'deactivate',
    SUBSCRIBE = 'subscribe',
    DELETE = 'delete',
}

export const actionMenuDefaultValues: Record<ACTION_TYPE, MenuItems> = {
    [ACTION_TYPE.ADD]: {
        icon: <PlusOutlined />,
        text: i18n.t('label.add'),
    },
    [ACTION_TYPE.EDIT]: {
        icon: <EditOutlined />,
        text: i18n.t('label.edit'),
    },
    [ACTION_TYPE.DELETE]: {
        icon: <DollarCircleOutlined />,
        text: i18n.t('label.delete'),
    },
    [ACTION_TYPE.DE_ACTIVATE]: {
        icon: <DeleteOutlined />,
        text: i18n.t('label.deactivate'),
    },
    [ACTION_TYPE.SUBSCRIBE]: {
        icon: <DollarCircleOutlined />,
        text: i18n.t('label.subscribe'),
    },
}
