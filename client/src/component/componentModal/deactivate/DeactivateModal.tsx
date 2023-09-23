import { Col, Form, Input, Row, Typography } from 'antd'
import { AxiosError } from 'axios'
import React, { FC, useState } from 'react'

import BaseModal from '../../BaseModal/BaseModal'
import message from '../../CustomMessage/CustomMessage'
import { DeactivateModalProps } from './deactivate.interface'

const DeactivateModal: FC<DeactivateModalProps> = ({
    actionType: { title, buttonLabel, successMessage },
    onClose,
    id,
    afterClose,
    api,
}) => {
    const [form] = Form.useForm()
    const [isSaveDisable, setIsSaveDisable] = useState(true)

    const onSave = async (): Promise<void> => {
        try {
            api && (await api(id))
            message.success(successMessage)
        } catch (error) {
            message.error(error as AxiosError)

            throw error
        }
    }

    const modalProps = {
        title,
        buttonLabel,
        onOk: onSave,
    }

    const handleDeactivateChange = (): void => {
        if (form.getFieldValue('deactivate') === 'DELETE') {
            setIsSaveDisable(false)
        } else {
            !isSaveDisable && setIsSaveDisable(true)
        }
    }

    return (
        <BaseModal
            afterClose={afterClose}
            isSaveDisable={isSaveDisable}
            modalProps={modalProps}
            width={480}
            onClose={onClose}
        >
            <Form
                autoComplete="off"
                form={form}
                layout="vertical"
                name="Deactivate"
            >
                <Row gutter={20}>
                    <Col span={24}>
                        <Typography.Text>
                            Are you sure you want to deactivate user !!
                        </Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={
                                <>
                                    Type&nbsp;<strong>DELETE</strong>&nbsp;to
                                    confirm
                                </>
                            }
                            name="deactivate"
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                placeholder="DELETE"
                                onChange={handleDeactivateChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default DeactivateModal
