import { Col, Form, Input, InputNumber, Row } from 'antd'
import { FormInstance } from 'antd/lib'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const PricingFrom = ({ form }: { form: FormInstance }) => {
    const { t } = useTranslation()

    const costPerItem = Form.useWatch('costPerItem', form)
    const discountValue = Form.useWatch('discount', form)

    useEffect(() => {
        const finalPricePerItem =
            costPerItem - (costPerItem * discountValue) / 100

        const quantity = form.getFieldValue('quantity')

        const totalAmount = finalPricePerItem * quantity

        form.setFieldsValue({ finalPricePerItem, totalAmount })
    }, [costPerItem, discountValue])

    return (
        <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            validateMessages={VALIDATION_MESSAGES}>
            <Row gutter={[20, 0]}>
                <Col span={12}>
                    <Form.Item
                        label={t('label.cost-per-item')}
                        name="costPerItem"
                        rules={[
                            {
                                required: true,
                                max: 9999999999,
                                min: 1,
                                type: 'number',
                            },
                        ]}>
                        <InputNumber className="w-full" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={t('label.discount')}
                        name="discount"
                        rules={[
                            {
                                max: 100,
                                min: 0,
                                type: 'number',
                            },
                        ]}>
                        <InputNumber
                            className="w-full"
                            defaultValue={0}
                            formatter={(value) => `${value}%`}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={t('label.final-price')}
                        name="finalPricePerItem">
                        <Input disabled />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={t('label.total-amount')}
                        name="totalAmount">
                        <Input disabled />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PricingFrom
