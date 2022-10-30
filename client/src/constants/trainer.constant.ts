export const TRAINER_ACTIONS = {
    ADD: {
        buttonLabel: 'Add',
        successMessage: 'Successfully added the trainer',
        title: 'Add Trainer',
        value: 'add',
    },
    DEACTIVATE: {
        buttonLabel: 'Deactivate',
        successMessage: 'Successfully deactivated the trainer',
        title: 'Deactivate Trainer',
        value: 'delete',
    },
    EDIT: {
        buttonLabel: 'Update',
        successMessage: 'Successfully edited the trainer',
        title: 'Edit Trainer',
        value: 'edit',
    },
}

export const TRAINER_MODAL_DATA = {
    actionType: TRAINER_ACTIONS.ADD,
    formData: {},
    visible: false,
}
