export const GYM_ACTIONS = {
    ADD: {
        buttonLabel: 'Add',
        successMessage: 'Successfully added the Gym',
        title: 'Add Gym',
        value: 'add',
    },
    DEACTIVATE: {
        buttonLabel: 'Deactivate',
        successMessage: 'Successfully deactivated the Gym',
        title: 'Deactivate Gym',
        value: 'delete',
    },
    EDIT: {
        buttonLabel: 'Update',
        successMessage: 'Successfully updated the Gym',
        title: 'Edit Gym',
        value: 'edit',
    },
    SUBSCRIBE: {
        buttonLabel: 'Subscribe',
        successMessage: 'Membership Successfully updated',
        title: 'Subscribe Gym',
        value: 'subscribe',
    },
}

export const GYM_MODAL_DATA = {
    actionType: GYM_ACTIONS.ADD,
    formData: {},
}
