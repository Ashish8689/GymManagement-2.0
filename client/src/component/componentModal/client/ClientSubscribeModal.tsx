import React, { FC, useCallback, useState } from 'react'
import BaseModal from '../../BaseModal'
import TextArea from 'antd/lib/input/TextArea'
import { Form, Input, Col, Row, Select, Radio, RadioChangeEvent } from 'antd'
import { MEMBERSHIP_PLAN } from '../../../constants/clients.constant'
import { Option } from 'antd/lib/mentions'

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

const PAYMENT_TYPE = {
    cash: 'Cash',
    'card/upi': 'Card/Upi',
}

const ClientSubscribeModal: FC<ClientModal> = ({
    actionType: { title, buttonLabel, successMessage, value },
    formData,
    open,
    onClose,
}) => {
    const [form] = Form.useForm()
    const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.cash)

    const handlePaymentMethodChange = useCallback((e: RadioChangeEvent) => {
        setPaymentType(e.target.value)
    }, [])

    const _onOk = useCallback(async () => {
        await form.validateFields()
    }, [form])

    const _modalProps = {
        title,
        buttonLabel,
        onOk: _onOk,
    }

    return (
        <BaseModal
            form={form}
            modalProps={_modalProps}
            open={open}
            setComponentModal={(value: boolean) => value}
            onClose={onClose}
        >
            <Form
                autoComplete="off"
                form={form}
                layout="vertical"
                name="clientMembership"
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label="Membership"
                            name="membership"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please select your Membership Period',
                                },
                            ]}
                        >
                            <Select>
                                {MEMBERSHIP_PLAN.map(({ label, value }) => (
                                    <Option key={value} value={value}>
                                        {label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Ending Date" name="endDate">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Payment Method" name="paymentMethod">
                            <Radio.Group onChange={handlePaymentMethodChange}>
                                <Radio value="cash">Cash</Radio>
                                <Radio value="card/upi">Card/UPI</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Collected By" name="collectedBy">
                            <Select>
                                <Option value="ashish">Ashish</Option>
                                <Option value="rafi">Rafi</Option>
                                <Option value="safdar">Safdar</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {paymentType !== 'cash' && (
                        <Col span={12}>
                            <Form.Item
                                label="TransactionID"
                                name="transactionId"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    )}
                </Row>
            </Form>
        </BaseModal>
    )
}

export default ClientSubscribeModal
