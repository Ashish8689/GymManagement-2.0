import i18n from 'component/utils/i18next/LocalUtils'

export const SUBSCRIPTION_ACTIONS = {
    ADD: {
        buttonLabel: i18n.t('label.add'),
        successMessage: i18n.t('message.entity-action-successfully', {
            entity: i18n.t('label.subscription'),
            action: i18n.t('label.added-lowercase'),
        }),
        title: i18n.t('label.action-entity', {
            entity: i18n.t('label.subscription'),
            action: i18n.t('label.add'),
        }),
        value: 'add',
    },
    DELETE: {
        buttonLabel: i18n.t('label.delete'),
        successMessage: i18n.t('label.entity-action-successfully', {
            entity: i18n.t('label.subscription'),
            action: i18n.t('label.deleted-lowercase'),
        }),
        title: i18n.t('label.action-entity', {
            entity: i18n.t('label.subscription'),
            action: i18n.t('label.delete'),
        }),
        value: 'delete',
    },
    EDIT: {
        buttonLabel: i18n.t('label.update'),
        successMessage: i18n.t('label.entity-action-successfully', {
            entity: i18n.t('label.subscription'),
            action: i18n.t('label.updated-lowercase'),
        }),
        title: i18n.t('label.action-entity', {
            entity: i18n.t('label.subscription'),
            action: i18n.t('label.edit'),
        }),
        value: 'edit',
    },
}
