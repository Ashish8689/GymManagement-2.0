import React, { FC, useCallback } from 'react'
import BaseModal from '../../BaseModal'
import TextArea from 'antd/lib/input/TextArea'
import { Form, Input, Col, Row } from 'antd'
import { addClients } from '../../rest/client.rest'

interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
}

interface ClientModal {
    open: boolean
    formData: any
    actionType: ActionType
    onClose: () => void
}

const ClientModal: FC<ClientModal> = ({
    actionType: { title, buttonLabel, successMessage, value },
    formData,
    open,
    onClose,
}) => {
    const [form] = Form.useForm()

    const _onOk = useCallback(async () => {
        await form.validateFields()
        try {
            const data = await form.getFieldsValue()
            addClients(data)
        } catch (error) {
            console.error(error)

            throw error
        }
    }, [form])

    const _modalProps = {
        title,
        buttonLabel,
        onOk: _onOk,
    }

    return (
        <BaseModal
            modalProps={_modalProps}
            open={open}
            setComponentModal={(value: boolean) => value}
            onClose={onClose}
        >
            <Form
                autoComplete="off"
                form={form}
                initialValues={formData}
                layout="vertical"
                name="Add_Client"
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label="Client Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Client Name is required',
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
                            label="Mobile"
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mobile number is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Alternate Mobile" name="altMobile">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Address is required',
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
