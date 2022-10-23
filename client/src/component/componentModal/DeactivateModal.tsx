import { Col, Form, Input, Row, Typography } from 'antd'
import React, { FC, useCallback } from 'react'

import BaseModal from '../BaseModal'
import { ClientModalProps } from './client/clientModal.interface'

const DeactivateModal: FC<ClientModalProps> = ({
    actionType: { title, buttonLabel, successMessage },
    onClose,
}) => {
    const [form] = Form.useForm()

    const onSave = useCallback(async () => {
        await form.validateFields()
        // try {
        //  const _response = await form.getFieldsValue()
        //  console.log(_response)
        // } catch (error) {
        //     throw error
        // }
    }, [form])

    const modalProps = {
        title,
        buttonLabel,
        onOk: onSave,
    }

    return (
        <BaseModal
            form={form}
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
                                    Type&nbsp;<strong>Delete</strong>&nbsp;to
                                    confirm
                                </>
                            }
                            name="deactivate"
                            style={{ marginBottom: 0 }}
                        >
                            <Input placeholder="DELETE" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default DeactivateModal
