import i18n from 'component/utils/i18next/LocalUtils'
import { Status } from 'enums/common.enums'
import { t } from 'i18next'

export const CONFIG_THEME = {
    hashed: false,
    token: {
        colorPrimary: '#7147E8',
        colorLink: '#7147E8',
    },
}

export const ERROR_500 = t('message.something-went-wrong')
export const SMALL_TABLE_LOADER_SIZE = 4

export const ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
}

export const STATUS_TYPE_OPTIONS = [
    {
        label: t('label.active'),
        value: Status.ACTIVE,
    },
    {
        label: t('label.in-active'),
        value: Status.IN_ACTIVE,
    },
]

export const VALIDATION_MESSAGES = {
    required: i18n.t('message.field-text-is-required', {
        fieldText: '${label}',
    }),
    types: {
        email: i18n.t('message.entity-is-not-valid', {
            entity: '${label}',
        }),
        number: i18n.t('message.entity-is-not-valid', {
            entity: '${label}',
        }),
        string: i18n.t('message.entity-is-not-valid', {
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
