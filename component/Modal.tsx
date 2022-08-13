import { Button, Modal } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { noop } from 'lodash'
import React, { useState, useCallback, FC } from 'react'

interface ModalProps {
    title: string
    onOk: () => void
}

interface BaseModalProps {
    setComponentModal: (value: boolean) => void
    children: any
    form: FormInstance
    modalProps: ModalProps
}

const BaseModal: FC<BaseModalProps> = ({
    setComponentModal,
    children,
    form,
    modalProps,
}: BaseModalProps) => {
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)

    const onOk = async (): Promise<any> => {
        setLoading(true)
        try {
            await (modalProps.onOk || noop)()
            setVisible(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }
    const onCancel = useCallback(() => {
        setVisible(false)
        setComponentModal(false)
    }, [])

    return (
        <Modal
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
                    Submit
                </Button>,
            ]}
            maskClosable={false}
            title={modalProps.title}
            visible={visible}
            width={700}
            onCancel={onCancel}
            onOk={onOk}
        >
            {children}
        </Modal>
    )
}

export default BaseModal
