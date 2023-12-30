import { ReactNode } from 'react'

export interface ModalFooterProps {
    onSave: () => Promise<void>
    onCancel: () => void
}
export interface ModalProps {
    title: string
    onOk: () => Promise<void>
    saveButtonLabel?: string
    footer?: ({ onSave, onCancel }: ModalFooterProps) => void
}

export interface BaseModalProps {
    children: ReactNode
    modalProps: ModalProps
    onClose?: () => void
    afterClose?: () => void
    isSaveDisable?: boolean
}

export interface ModalFooterFunctionProps extends ModalFooterProps {
    isLoading: boolean
    activeStep: number
    stepperLength: number
    handleNext: () => Promise<void>
    handlePrevious: () => void
}
