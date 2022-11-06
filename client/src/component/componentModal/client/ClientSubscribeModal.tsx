import React, { FC, useCallback, useState } from 'react'
import { Form, Input, Col, Row, Select, Radio, RadioChangeEvent } from 'antd'
import { Option } from 'antd/lib/mentions'

import BaseModal from '../../BaseModal/BaseModal'
import { MEMBERSHIP_PLAN } from '../../../constants/clients.constant'
import { ClientModalProps } from './clientModal.interface'
import { AxiosError } from 'axios'
import message from '../../CustomMessage'
import { updateClientMembership } from '../../rest/client.rest'
import { getFutureMonthDate } from '../../utils/date.utils'

const PAYMENT_TYPE = {
    cash: 'Cash',
    'card/upi': 'Card/Upi',
}

const ClientSubscribeModal: FC<ClientModalProps> = ({
    actionType: { title, buttonLabel, successMessage },
    formData,
    onClose,
    afterClose,
}) => {
    const [form] = Form.useForm()
    const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.cash)

    const handlePaymentMethodChange = useCallback((e: RadioChangeEvent) => {
        setPaymentType(e.target.value)
    }, [])

    const handleSetEndDate = (value: string): void => {
        form.setFieldsValue({ endDate: getFutureMonthDate(+value) })
    }

    const getEndDateAPI = (date: string): Date => {
        const dateArr = date.split('/')

        return new Date(
            [Number(dateArr[2]), Number(dateArr[1]), Number(dateArr[0])].join(
                '-'
            )
        )
    }

    console.log(getEndDateAPI('06/05/2023'))

    const _onOk = useCallback(async () => {
        await form.validateFields()

        try {
            const { endDate, ...restProps } = form.getFieldsValue()
            const data = {
                ...restProps,
                paymentDate: new Date(),
                endDate: getEndDateAPI(endDate),
            }
            await updateClientMembership(formData.clientCode, data)
            message.success(successMessage)
        } catch (err) {
            message.error(err as AxiosError)
        }
    }, [form])

    const _modalProps = {
        title,
        buttonLabel,
        onOk: _onOk,
    }

    return (
        <BaseModal
            afterClose={afterClose}
            modalProps={_modalProps}
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
                            <Select onChange={handleSetEndDate}>
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
                            <Input disabled />
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
                        <Form.Item label="Collected By" name="paymentCollector">
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
