import i18n from 'component/utils/i18next/LocalUtils'

export const DASHBOARD_STATUS_CARDS = [
    {
        name: i18n.t('label.client-plural'),
        keys: 'clients',
        dotColor: 'status-bg-primary',
    },
    {
        name: i18n.t('label.trainer-plural'),
        keys: 'trainers',
        dotColor: 'status-bg-trainer',
    },
    {
        name: i18n.t('label.equipment-plural'),
        keys: 'equipments',
        dotColor: 'status-bg-equipment',
    },
    {
        name: i18n.t('label.client-join'),
        keys: 'clientsJoin',
        dotColor: 'status-bg-client-join',
    },
]
