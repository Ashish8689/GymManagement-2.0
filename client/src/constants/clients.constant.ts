export const CLIENT_ACTIONS = {
    ADD: {
        buttonLabel: 'Add',
        successMessage: 'Successfully added the client',
        title: 'Add Client',
        value: 'add',
    },
    DEACTIVATE: {
        buttonLabel: 'Deactivate',
        successMessage: 'Successfully deactivated the client',
        title: 'Deactivate Client',
        value: 'delete',
    },
    EDIT: {
        buttonLabel: 'Update',
        successMessage: 'Successfully updated the client',
        title: 'Edit Client',
        value: 'edit',
    },
    SUBSCRIBE: {
        buttonLabel: 'Subscribe',
        successMessage: 'Membership Successfully updated',
        title: 'Subscribe Client',
        value: 'subscribe',
    },
}

export const CLIENT_MODAL_DATA = {
    actionType: CLIENT_ACTIONS.ADD,
    formData: {},
}

export const MEMBERSHIP_PLAN = [
    { label: '1 Month', value: '1' },
    { label: '2 Months', value: '2' },
    { label: '3 Months', value: '3' },
    { label: '6 Months', value: '6' },
    { label: '12 Months', value: '12' },
]
