import {
    DeleteOutlined,
    DollarCircleOutlined,
    EditOutlined,
} from '@ant-design/icons'
import i18n from 'component/utils/i18next/LocalUtils'
import { t } from 'i18next'
import { ActionMenuDefaultValues } from '../component/ActionMenu/ActionMenu.interface'

export const ERROR_500 = t('message.something-went-wrong')
export const SMALL_TABLE_LOADER_SIZE = 4

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

export const VALIDATION_MESSAGES = {
    required: i18n.t('message.field-text-is-required', {
        fieldText: '${label}',
    }),
    types: {
        email: i18n.t('message.entity-is-not-valid', {
            entity: '${label}',
        }),
    },
    whitespace: i18n.t('message.field-text-is-required', {
        fieldText: '${label}',
    }),
    string: {
        range: i18n.t('message.entity-size-in-between', {
            entity: '${label}',
            min: '${min}',
            max: '${max}',
        }),
    },
    number: {
        range: i18n.t('message.entity-size-in-between', {
            entity: '${label}',
            min: '${min}',
            max: '${max}',
        }),
    },
}
