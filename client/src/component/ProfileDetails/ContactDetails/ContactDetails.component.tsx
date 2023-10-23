import { Col, Form, FormInstance, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useTranslation } from 'react-i18next'

const ContactDetails = ({ form }: { form: FormInstance }) => {
    const { t } = useTranslation()

    return (
        <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            validateMessages={VALIDATION_MESSAGES}>
            <Row gutter={20}>
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

                <Col span={24}>
                    <Form.Item
                        label={t('label.address')}
                        name="address"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default ContactDetails
