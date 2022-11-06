import React, { FC, useEffect } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Form, Input, Col, Row } from 'antd'

import BaseModal from '../../BaseModal/BaseModal'
import { GymModalProps } from './gymModal.interface'
import message from '../../CustomMessage'
import { addGym, generateGymCode, updateGym } from '../../rest/gym.rest'

const GymModal: FC<GymModalProps> = ({
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
    }

    const getGymCode = async (): Promise<void> => {
        try {
            const { gymCode } = await generateGymCode()
            form.setFieldsValue({
                gymCode,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onSave = async (): Promise<void> => {
        await form.validateFields()
        try {
            const data = await form.getFieldsValue()
            isEdit ? await updateGym(data.gymCode, data) : await addGym(data)

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
        !isEdit && getGymCode()
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
                        <Form.Item label="Gym Code" name="gymCode">
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Gym Name"
                            name="gymName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Owner Name"
                            name="ownerName"
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
                </Row>
            </Form>
        </BaseModal>
    )
}

export default GymModal
