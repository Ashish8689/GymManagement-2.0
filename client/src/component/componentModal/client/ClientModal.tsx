import React, { FC } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Form, Input, Col, Row, InputNumber } from 'antd'

import BaseModal from '../../BaseModal'
import { addClients } from '../../rest/client.rest'
import { ClientModalProps } from './clientModal.interface'

const ClientModal: FC<ClientModalProps> = ({
    actionType: { title, buttonLabel, successMessage },
    formData,
    onClose,
    afterClose,
}) => {
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

    const onSave = async (): Promise<void> => {
        await form.validateFields()
        try {
            const data = await form.getFieldsValue()
            await addClients(data)
            console.log(successMessage)
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

    return (
        <BaseModal
            afterClose={afterClose}
            form={form}
            modalProps={modalProps}
            onClose={onClose}
        >
            <Form
                autoComplete="off"
                form={form}
                initialValues={formData}
                layout="vertical"
                name={`${'A'}_client`}
                validateMessages={validateMessages}
            >
                <Row gutter={20}>
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
                        <Form.Item label="Email" name="email">
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

                    <Col span={24}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea
                                autoSize={{ minRows: 2, maxRows: 3 }}
                                maxLength={6}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default ClientModal
