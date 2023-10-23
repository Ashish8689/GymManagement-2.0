import {
    Col,
    DatePicker,
    Form,
    FormInstance,
    Input,
    Radio,
    Row,
    Select,
    Spin,
} from 'antd'
import { AxiosError } from 'axios'
import message from 'component/CustomMessage/CustomMessage'
import { generateClientCode } from 'component/rest/client.rest'
import { generateTrainerCode } from 'component/rest/trainer.rest'
import {
    GENDER_OPTIONS,
    MARITAL_STATUS_OPTIONS,
} from 'constants/add-stepper.constant'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const PersonalDetails = ({
    form,
    isClientType,
}: {
    form: FormInstance
    isClientType: boolean
}) => {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getClientCode = async (): Promise<void> => {
        try {
            const { clientCode } = await generateClientCode()
            form.setFieldsValue({
                clientCode,
            })
        } catch (error) {
            message.error(error as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    const getTrainerCode = async (): Promise<void> => {
        try {
            const { trainerCode } = await generateTrainerCode()
            form.setFieldsValue({
                trainerCode,
            })
        } catch (error) {
            message.error(error as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isClientType) {
            getClientCode()
        } else {
            getTrainerCode()
        }
    }, [])

    if (isLoading) {
        return (
            <div className="flex-center m-t-xlg">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            validateMessages={VALIDATION_MESSAGES}>
            <Row gutter={[20, 0]}>
                <Col span={12}>
                    {isClientType ? (
                        <Form.Item label="Client Code" name="clientCode">
                            <Input disabled />
                        </Form.Item>
                    ) : (
                        <Form.Item label="Trainer Code" name="trainerCode">
                            <Input disabled />
                        </Form.Item>
                    )}
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={t('label.gender')}
                        name="gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Select options={GENDER_OPTIONS} />
                    </Form.Item>
                </Col>

                <Col span={24}>
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
                        label={t('label.date-of-birth')}
                        name="dateOfBirth"
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
                        label={t('label.marital-status')}
                        name="maritalStatus"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Radio.Group
                            buttonStyle="solid"
                            className="w-full"
                            optionType="button"
                            options={MARITAL_STATUS_OPTIONS}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PersonalDetails
