import {
    Button,
    Col,
    Form,
    FormProps,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import { AxiosError } from 'axios'
import message from 'component/CustomMessage/CustomMessage'
import { addSubscription } from 'component/rest/subscription.rest'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { SUBSCRIPTION_ACTIONS } from 'constants/subscription.constant'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AddSubscriptionProps } from './addSubscription.interface'

const AddSubscription = ({ onCancel, onSuccess }: AddSubscriptionProps) => {
    const [form] = useForm()
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const durationMonth = useMemo(() => {
        const durationMonth = []
        for (let i = 1; i <= 24; i++) {
            durationMonth.push({
                label: t('label.entity-month', {
                    entity: i,
                }),
                value: i,
            })
        }

        return durationMonth
    }, [])

    const handleSubmit: FormProps['onFinish'] = async (data) => {
        setIsLoading(true)
        try {
            await addSubscription(data)
            message.success(SUBSCRIPTION_ACTIONS.ADD.successMessage)
            onSuccess()
        } catch (error) {
            message.error(error as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            destroyOnClose
            open
            cancelText={t('label.cancel')}
            closable={false}
            footer={[
                <Button key="cancel-btn" type="link" onClick={onCancel}>
                    {t('label.cancel')}
                </Button>,
                <Button
                    data-testid="save-sub-domain"
                    key="save-btn"
                    loading={isLoading}
                    type="primary"
                    onClick={() => form.submit()}>
                    {t('label.save')}
                </Button>,
            ]}
            maskClosable={false}
            okText={t('label.submit')}
            title={t('label.add-entity', {
                entity: t('label.subscription'),
            })}
            width={750}
            onCancel={onCancel}>
            <Form
                autoComplete="off"
                form={form}
                layout="vertical"
                validateMessages={VALIDATION_MESSAGES}
                onFinish={handleSubmit}>
                <Row gutter={[20, 0]}>
                    <Col span={24}>
                        <Form.Item
                            label={t('label.entity-name', {
                                entity: t('label.subscription'),
                            })}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={t('label.price')}
                            name="price"
                            rules={[
                                {
                                    type: 'number',
                                    min: 999,
                                    max: 99999,
                                    required: true,
                                },
                            ]}>
                            <InputNumber className="w-full" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={t('label.duration')}
                            name="duration"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Select options={durationMonth} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label={t('label.description')}
                            name="description">
                            <TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default AddSubscription
