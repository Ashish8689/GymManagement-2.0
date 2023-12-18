import {
    Col,
    DatePicker,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Row,
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useTranslation } from 'react-i18next'

const EquipmentForm = ({ form }: { form: FormInstance }) => {
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
                        label={t('label.equipment')}
                        name="equipment"
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
                        label={t('label.date-of-purchase')}
                        name="dateOfPurchase"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <DatePicker className="w-full" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={t('label.quantity')}
                        name="quantity"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                required: true,
                            },
                        ]}>
                        <InputNumber className="w-full" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label={t('label.description')}
                        name="description">
                        <TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default EquipmentForm
