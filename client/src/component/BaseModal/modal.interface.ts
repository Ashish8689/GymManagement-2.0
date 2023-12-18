import { ReactNode } from 'react'

export interface ModalFooterProps {
    onSave: () => Promise<void>
    onCancel: () => void
}
export interface ModalProps {
    title: string
    onOk: () => Promise<void>
    buttonLabel?: string
    footer?: ({ onSave, onCancel }: ModalFooterProps) => void
}

export interface BaseModalProps {
    children: ReactNode
    width?: number
    modalProps: ModalProps
    onClose?: () => void
    afterClose?: () => void
    isSaveDisable?: boolean
}
