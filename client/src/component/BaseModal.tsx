import React, { useState, FC } from 'react'
import { Button, Modal } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { AxiosError } from 'axios'

interface ModalProps {
    title: string
    onOk: () => void
    buttonLabel?: string
}

interface BaseModalProps {
    children: any
    modalProps: ModalProps
    onClose: () => void
    form: FormInstance
    width?: number
    afterClose?: () => void
}

const BaseModal: FC<BaseModalProps> = ({
    children,
    modalProps,
    onClose,
    form,
    afterClose,
    width = 700,
}: BaseModalProps) => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)

    const onOk = async (): Promise<void> => {
        setLoading(true)
        try {
            await modalProps.onOk()
            onClose()
            form.resetFields()
        } catch (e) {
            console.log(e as AxiosError)
        } finally {
            setLoading(false)
        }
    }
    const onCancel = (): void => {
        onClose()
        setVisible(false)
    }

    return (
        <Modal
            {...modalProps}
            afterClose={afterClose}
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
            title={modalProps.title}
            visible={visible}
            width={width}
            onCancel={onCancel}
            onOk={onOk}
        >
            {children}
        </Modal>
    )
}

export default BaseModal
