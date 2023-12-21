import i18n from 'component/utils/i18next/LocalUtils'

export const PROFILE_STEPPER = [
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

export const EQUIPMENT_STEPPER = [
    {
        title: i18n.t('label.equipment-details'),
        key: 'equipment',
    },
    {
        title: i18n.t('label.vendor-details'),
        key: 'vendor',
    },
    {
        title: i18n.t('label.pricing-details'),
        key: 'pricing',
    },
]

export const STAFF_STEPPER = [
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
    {
        title: i18n.t('label.work-information'),
        key: 'work-information',
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
