import { ReactNode } from 'react'

export interface ModalProps {
    title: string
    onOk: () => Promise<void>
    buttonLabel?: string
}

export interface BaseModalProps {
    children: ReactNode
    width?: number
    modalProps: ModalProps
    onClose?: () => void
    afterClose?: () => void
    isSaveDisable?: boolean
}
