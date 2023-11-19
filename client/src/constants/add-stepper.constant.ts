import i18n from 'component/utils/i18next/LocalUtils'

export const ADD_STEPPER = [
    {
        title: i18n.t('label.profile-image'),
        key: 'profile',
    },
    {
        title: i18n.t('label.personal-detail-plural'),
        key: 'personal-details',
    },
    {
        title: i18n.t('label.contact-information'),
        key: 'contact-information',
    },
]

export const GENDER_OPTIONS = [
    {
        label: i18n.t('label.male'),
        value: 'male',
    },
    {
        label: i18n.t('label.female'),
        value: 'female',
    },
    {
        label: i18n.t('label.other'),
        value: 'other',
    },
]

export const MARITAL_STATUS_OPTIONS = [
    { label: i18n.t('label.married'), value: 'married' },
    { label: i18n.t('label.un-married'), value: 'unMarried' },
]
