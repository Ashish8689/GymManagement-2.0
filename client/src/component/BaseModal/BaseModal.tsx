import { Button, Modal } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseModalProps } from './modal.interface'

const BaseModal: FC<BaseModalProps> = ({
    children,
    modalProps,
    onClose,
    afterClose,
    width = 700,
    isSaveDisable,
}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true)

    const onCancel = (): void => {
        onClose?.()
        setIsModalOpen(false)
    }

    const onOk = async (): Promise<void> => {
        setLoading(true)
        try {
            await modalProps.onOk()
            setIsModalOpen(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            {...modalProps}
            destroyOnClose
            afterClose={afterClose}
            cancelText={t('label.cancel')}
            closable={false}
            footer={[
                <Button
                    data-testid="cancel-button"
                    key="cancel-button"
                    type="link"
                    onClick={onCancel}>
                    {t('label.cancel')}
                </Button>,
                <Button
                    data-testid="save-button"
                    disabled={isSaveDisable}
                    key="save-button"
                    loading={loading}
                    type="primary"
                    onClick={onOk}>
                    {modalProps.buttonLabel ?? t('label.save')}
                </Button>,
            ]}
            maskClosable={false}
            open={isModalOpen}
            title={modalProps.title}
            width={width}
            onCancel={onCancel}
            onOk={onOk}>
            {children}
        </Modal>
    )
}

export default BaseModal
