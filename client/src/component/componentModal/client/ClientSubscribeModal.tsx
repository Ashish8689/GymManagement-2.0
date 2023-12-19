import { Col, Form, Input, Radio, RadioChangeEvent, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import { AxiosError } from 'axios'
import { FC, useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import {
    MEMBERSHIP_PLAN,
    PAYMENT_TYPE,
} from '../../../constants/clients.constant'
import BaseModal from '../../BaseModal/BaseModal'
import message from '../../CustomMessage/CustomMessage'
import { updateClientMembership } from '../../rest/client.rest'
import { getTrainers } from '../../rest/trainer.rest'
import { getFutureMonthDate } from '../../utils/date.utils'
import { ClientModalProps, PaymentCollector } from './clientModal.interface'

const ClientSubscribeModal: FC<ClientModalProps> = ({
    formData,
    onClose,
    afterClose,
}) => {
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.CASH)
    const [paymentCollector, setPaymentCollector] =
        useState<PaymentCollector[]>()

    const fetchTrainers = async (): Promise<void> => {
        try {
            const response = await getTrainers()
            setPaymentCollector(
                response.map((res) => ({ id: res._id, label: res.name }))
            )
        } catch (err) {
            message.error(err as AxiosError)
        }
    }

    const handlePaymentMethodChange = useCallback((e: RadioChangeEvent) => {
        setPaymentType(e.target.value)
    }, [])

    const handleSetEndDate = (value: string): void => {
        form.setFieldsValue({ membershipEnding: getFutureMonthDate(+value) })
    }

    const getEndDateAPI = (date: string): Date => {
        const dateArr = date.split('/')

        return new Date(
            [Number(dateArr[2]), Number(dateArr[1]), Number(dateArr[0])].join(
                '-'
            )
        )
    }

    const _onOk = useCallback(async () => {
        await form.validateFields()

        try {
            const { membershipEnding, ...restProps } = form.getFieldsValue()
            const data = {
                ...restProps,
                paymentDate: new Date(),
                membershipEnding: getEndDateAPI(membershipEnding),
            }
            await updateClientMembership(formData.clientCode, data)
            message.success(
                t('message.entity-action-successfully', {
                    entity: t('label.membership'),
                    action: t('label.updated'),
                })
            )
        } catch (err) {
            message.error(err as AxiosError)
        }
    }, [form])

    const _modalProps = {
        title: t('label.subscription'),
        saveButtonLabel: t('label.subscribe-client'),
        onOk: _onOk,
    }

    useEffect(() => {
        fetchTrainers()
    }, [])

    return (
        <BaseModal
            afterClose={afterClose}
            modalProps={_modalProps}
            onClose={onClose}>
            <Form
                autoComplete="off"
                form={form}
                layout="vertical"
                name="clientMembership">
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
                            ]}>
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
                        <Form.Item label="Ending Date" name="membershipEnding">
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Payment Method" name="paymentMethod">
                            <Radio.Group onChange={handlePaymentMethodChange}>
                                <Radio value="cash">{t('label.cash')}</Radio>
                                <Radio value="card/upi">
                                    {t('label.card-upi')}
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Collected By" name="paymentCollector">
                            <Select>
                                {paymentCollector?.map(({ id, label }) => (
                                    <Option key={id} value={id}>
                                        {label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    {paymentType !== 'cash' && (
                        <Col span={12}>
                            <Form.Item
                                label="TransactionID"
                                name="transactionId">
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
