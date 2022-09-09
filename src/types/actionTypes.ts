export interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
}

export interface ActionSet {
    type: string
    actionType: ActionType
}
