import { Button, Modal } from 'antd'
import { AxiosError } from 'axios'
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
    const [visible, setVisible] = useState(true)

    const onCancel = (): void => {
        onClose()
        setVisible(false)
    }

    const onOk = async (): Promise<void> => {
        setLoading(true)
        try {
            await modalProps.onOk()
            setVisible(false)
        } catch (e) {
            console.error(e as AxiosError)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            {...modalProps}
            afterClose={afterClose}
            footer={[
                <Button
                    className="cancel-button"
                    key="back"
                    type="link"
                    onClick={onCancel}>
                    {t('label.cancel')}
                </Button>,
                <Button
                    className="button"
                    disabled={isSaveDisable}
                    key="submit"
                    loading={loading}
                    type="primary"
                    onClick={onOk}>
                    {modalProps.buttonLabel || 'Save'}
                </Button>,
            ]}
            title={modalProps.title}
            visible={visible}
            width={width}
            onCancel={onCancel}
            onOk={onOk}>
            {children}
        </Modal>
    )
}

export default BaseModal
