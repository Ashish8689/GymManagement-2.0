import React, { FC, useCallback, useState } from 'react'
import { Form, Input, Col, Row, Select, Radio, RadioChangeEvent } from 'antd'
import { Option } from 'antd/lib/mentions'

import BaseModal from '../../BaseModal/BaseModal'
import { MEMBERSHIP_PLAN } from '../../../constants/clients.constant'
import { ClientModalProps } from './clientModal.interface'

const PAYMENT_TYPE = {
    cash: 'Cash',
    'card/upi': 'Card/Upi',
}

const ClientSubscribeModal: FC<ClientModalProps> = ({
    actionType: { title, buttonLabel, successMessage, value },
    formData,
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
        <BaseModal modalProps={_modalProps} onClose={onClose}>
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
                                <Option value="ravi">Ravi</Option>
                                <Option value="sharik">Sharik</Option>
                                <Option value="azim">Azim</Option>
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
