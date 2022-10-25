export interface ModalProps {
    title: string
    onOk: () => void
    buttonLabel?: string
}

export interface BaseModalProps {
    children: any
    modalProps: ModalProps
    onClose: () => void
    width?: number
    afterClose?: () => void
    isSaveDisable?: boolean
}
