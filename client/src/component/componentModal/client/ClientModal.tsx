import React, { FC, useEffect } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Form, Input, Col, Row, InputNumber } from 'antd'

import BaseModal from '../../BaseModal/BaseModal'
import {
    addClients,
    generateClientCode,
    updateClient,
} from '../../rest/client.rest'
import { ClientModalProps } from './clientModal.interface'
import message from '../../CustomMessage/CustomMessage'

const ClientModal: FC<ClientModalProps> = ({
    actionType: { title, buttonLabel, successMessage, value },
    formData,
    onClose,
    afterClose,
}) => {
    const isEdit = value === 'edit'
    const [form] = Form.useForm()

    const validateMessages = {
        required: '${label} is required',
        string: {
            range: '${label} must be between ${min} and ${max}',
        },
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    }

    const getClientCode = async (): Promise<void> => {
        try {
            const { clientCode } = await generateClientCode()
            form.setFieldsValue({
                clientCode,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onSave = async (): Promise<void> => {
        await form.validateFields()
        try {
            const data = await form.getFieldsValue()
            isEdit
                ? await updateClient(data.clientCode, data)
                : await addClients(data)

            message.success(successMessage)
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const modalProps = {
        title,
        buttonLabel,
        onOk: onSave,
    }

    useEffect(() => {
        !isEdit && getClientCode()
    }, [])

    return (
        <BaseModal
            afterClose={afterClose}
            modalProps={modalProps}
            onClose={onClose}
        >
            <Form
                autoComplete="off"
                form={form}
                initialValues={formData}
                layout="vertical"
                name={`${value}_client`}
                validateMessages={validateMessages}
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item label="Client Code" name="clientCode">
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Client Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                                { type: 'string', min: 3, max: 16 },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Mobile"
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    max: 10,
                                    min: 10,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Age"
                            name="age"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default ClientModal
