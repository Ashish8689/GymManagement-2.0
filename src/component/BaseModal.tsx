import React, { useState, useCallback, FC } from 'react'
import { Button, Modal } from 'antd'

interface ModalProps {
    title: string
    onOk: () => void
    buttonLabel?: string
}

interface BaseModalProps {
    setComponentModal: (value: boolean) => void
    children: any
    modalProps: ModalProps
    open: boolean
    onClose: () => void
}

const BaseModal: FC<BaseModalProps> = ({
    setComponentModal,
    children,
    modalProps,
    open,
    onClose,
}: BaseModalProps) => {
    const [loading, setLoading] = useState(false)

    const onOk = async (): Promise<any> => {
        setLoading(true)
        try {
            await modalProps.onOk()
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }
    const onCancel = useCallback(() => {
        setComponentModal(false)
        onClose()
    }, [])

    return (
        <Modal
            {...modalProps}
            footer={[
                <Button className="cancel-button" key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    className="button"
                    key="submit"
                    loading={loading}
                    type="primary"
                    onClick={onOk}
                >
                    {modalProps.buttonLabel || 'Save'}
                </Button>,
            ]}
            maskClosable={false}
            title={modalProps.title}
            visible={open}
            width={700}
            onCancel={onCancel}
            onOk={onOk}
        >
            {children}
        </Modal>
    )
}

export default BaseModal
