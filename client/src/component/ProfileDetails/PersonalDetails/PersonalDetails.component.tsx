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
import { generateEmployeeCode } from 'component/rest/Staff/staff.rest'
import { generateClientCode } from 'component/rest/client.rest'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import {
    GENDER_OPTIONS,
    MARITAL_STATUS_OPTIONS,
} from 'constants/stepper.constant'
import { ENTITY_TYPE } from 'enums/common.enums'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const PersonalDetails = ({
    form,
    isEditMode,
    entityType,
}: {
    form: FormInstance
    isEditMode: boolean
    entityType: ENTITY_TYPE
}) => {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { isClient, keyName } = useMemo(() => {
        const isClient = entityType === ENTITY_TYPE.CLIENT

        return {
            isClient,
            keyName: isClient ? 'clientCode' : 'employeeCode',
        }
    }, [entityType])

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

    const getEmployeeCode = async (): Promise<void> => {
        try {
            const { employeeCode } = await generateEmployeeCode()
            form.setFieldsValue({
                employeeCode,
            })
        } catch (error) {
            message.error(error as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!isEditMode && !form.getFieldValue(keyName)) {
            if (isClient) {
                getClientCode()
            } else {
                getEmployeeCode()
            }
        } else {
            setIsLoading(false)
        }
    }, [isClient, keyName])

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
                    {entityType === ENTITY_TYPE.CLIENT ? (
                        <Form.Item
                            label={t('label.entity-code', {
                                entity: t('label.client'),
                            })}
                            name="clientCode">
                            <Input disabled />
                        </Form.Item>
                    ) : (
                        <Form.Item
                            label={t('label.entity-code', {
                                entity: t('label.employee'),
                            })}
                            name="employeeCode">
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
                        label={t('label.entity-name', {
                            entity: t('label.client'),
                        })}
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
