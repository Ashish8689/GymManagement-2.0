import { Col, Form, FormInstance, Input, InputNumber, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useTranslation } from 'react-i18next'

const VendorForm = ({ form }: { form: FormInstance }) => {
    const { t } = useTranslation()

    return (
        <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            validateMessages={VALIDATION_MESSAGES}>
            <Row gutter={[20, 0]}>
                <Col span={24}>
                    <Form.Item
                        label={t('label.vendor')}
                        name="vendor"
                        rules={[
                            {
                                required: true,
                            },
                            { type: 'string', min: 3, max: 16 },
                        ]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label={t('label.entity-number', {
                            entity: t('label.contact'),
                        })}
                        name="number"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                max: 9999999999,
                                min: 999999999,
                                type: 'number',
                                message: `${t('label.entity-number', {
                                    entity: t('label.contact'),
                                })} must be 10 digits`,
                            },
                        ]}>
                        <InputNumber className="w-full" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label={t('label.address')} name="address">
                        <TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default VendorForm
