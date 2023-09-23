import React, { FC, useEffect } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Form, Input, Col, Row, InputNumber } from 'antd'

import BaseModal from '../../BaseModal/BaseModal'
import message from '../../CustomMessage/CustomMessage'
import { TrainerModalProps } from './trainer.interface'
import {
    addTrainer,
    generateTrainerCode,
    updateTrainer,
} from '../../rest/trainer.rest'

const TrainerModal: FC<TrainerModalProps> = ({
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

    const getTrainerCode = async (): Promise<void> => {
        try {
            const { trainerCode } = await generateTrainerCode()
            form.setFieldsValue({
                trainerCode,
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
                ? await updateTrainer(data.trainerCode, data)
                : await addTrainer(data)

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
        !isEdit && getTrainerCode()
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
                name={`${value}_trainer`}
                validateMessages={validateMessages}
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item label="Trainer Code" name="trainerCode">
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Trainer Name"
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

export default TrainerModal
