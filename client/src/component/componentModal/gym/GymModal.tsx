import { Col, Form, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useEffect, useMemo } from 'react'

import { ACTION_TYPE } from 'constants/action.constants'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useTranslation } from 'react-i18next'
import BaseModal from '../../BaseModal/BaseModal'
import message from '../../CustomMessage/CustomMessage'
import { addGym, generateGymCode, updateGym } from '../../rest/gym.rest'
import { GymModalProps } from './gymModal.interface'

const GymModal: FC<GymModalProps> = ({
    actionType,
    initialValues,
    onClose,
    afterClose,
}) => {
    const { t } = useTranslation()
    const [form] = Form.useForm()

    const isEdit = useMemo(() => actionType === ACTION_TYPE.EDIT, [actionType])

    const getGymCode = async (): Promise<void> => {
        try {
            const { gymCode } = await generateGymCode()
            form.setFieldsValue({
                gymCode,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onSave = async (): Promise<void> => {
        await form.validateFields()
        try {
            const data = await form.getFieldsValue()
            isEdit ? await updateGym(data.gymCode, data) : await addGym(data)

            message.success(
                t('message.entity-action-successfully', {
                    entity: t('label.membership'),
                    action: t(
                        `label.${isEdit ? 'updated' : 'added'}-lowercase`
                    ),
                })
            )
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const modalProps = {
        title: t('label.action-entity', {
            action: t(`label.${isEdit ? 'edit' : 'add'}`),
            entity: t('label.gym'),
        }),
        saveButtonLabel: isEdit ? t('label.update') : t('label.add'),
        onOk: onSave,
    }

    useEffect(() => {
        !isEdit && getGymCode()
    }, [])

    return (
        <BaseModal
            afterClose={afterClose}
            modalProps={modalProps}
            onClose={onClose}>
            <Form
                autoComplete="off"
                form={form}
                initialValues={initialValues}
                layout="vertical"
                validateMessages={VALIDATION_MESSAGES}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item label="Gym Code" name="gymCode">
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Gym Name"
                            name="gymName"
                            rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Owner Name"
                            name="ownerName"
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
                            label="Mobile"
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
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default GymModal
