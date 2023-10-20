import { Col, Form, Input, InputNumber, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import BaseModal from '../../BaseModal/BaseModal'
import message from '../../CustomMessage/CustomMessage'
import {
    addClients,
    generateClientCode,
    updateClient,
} from '../../rest/client.rest'
import { ClientModalProps } from './clientModal.interface'

const ClientModal: FC<ClientModalProps> = ({
    actionType: { title, buttonLabel, successMessage, value },
    formData,
    onClose,
    afterClose,
}) => {
    const { t } = useTranslation()
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
            onClose={onClose}>
            <Form
                autoComplete="off"
                form={form}
                initialValues={formData}
                layout="vertical"
                name={`${value}_client`}
                validateMessages={validateMessages}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item label="Client Code" name="clientCode">
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={t('label.client-name')}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                                { type: 'string', min: 3, max: 16 },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={t('label.mobile')}
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    max: 10,
                                    min: 10,
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={t('label.email')} name="email">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={t('label.address')}
                            name="address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={t('label.age')}
                            name="age"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                    required: true,
                                },
                            ]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default ClientModal
