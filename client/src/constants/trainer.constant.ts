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
    DELETE: {
        buttonLabel: 'Delete',
        successMessage: 'Successfully Delete the trainer',
        title: 'Delete Trainer',
        value: 'delete',
    },
}

export const TRAINER_MODAL_DATA = {
    actionType: TRAINER_ACTIONS.ADD,
    formData: {},
    visible: false,
}
