import i18n from 'component/utils/i18next/LocalUtils'

export const CLIENT_ACTIONS = {
    ADD: {
        saveButtonLabel: 'Add',
        successMessage: 'Successfully added the client',
        title: 'Add Client',
        value: 'add',
    },
    EDIT: {
        saveButtonLabel: 'Update',
        successMessage: 'Successfully updated the client',
        title: 'Edit Client',
        value: 'edit',
    },
}

export const MEMBERSHIP_PLAN = [
    { label: '1 Month', value: '1' },
    { label: '2 Months', value: '2' },
    { label: '3 Months', value: '3' },
    { label: '6 Months', value: '6' },
    { label: '12 Months', value: '12' },
]

export const PAYMENT_TYPE = {
    CASH: 'Cash',
    CARD_UPI: 'Card/Upi',
}

export const DEFAULT_CLIENT_CODE = 1

export const CLIENT_STATUS_CARDS = [
    {
        name: i18n.t('label.entity-client-plural', {
            entity: i18n.t('label.total'),
        }),
        keys: 'totalClients',
        dotColor: 'status-bg-primary',
    },
    {
        name: i18n.t('label.entity-client-plural', {
            entity: i18n.t('label.active'),
        }),
        keys: 'activeClients',
        dotColor: 'status-bg-trainer',
    },
    {
        name: i18n.t('label.entity-client-plural', {
            entity: i18n.t('label.in-active'),
        }),
        keys: 'inActiveClients',
        dotColor: 'status-bg-equipment',
    },
    {
        name: i18n.t('label.client-join'),
        keys: 'clientsJoin',
        dotColor: 'status-bg-client-join',
    },
]
