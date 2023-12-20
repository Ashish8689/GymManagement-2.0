import i18n from 'component/utils/i18next/LocalUtils'
import { t } from 'i18next'

export enum ENTITY_TYPE {
    CLIENT = 'client',
    TRAINER = 'trainer',
    GYM = 'gym',
    SUBSCRIPTION = 'subscription',
    CATEGORY = 'category',
    STAFF = 'staff',
    DEPARTMENT = 'department',
}

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
