import { Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import BaseModal from 'component/BaseModal/BaseModal'
import message from 'component/CustomMessage/CustomMessage'
import {
    addEquipmentCategory,
    updateEquipmentCategory,
} from 'component/rest/equipmentCategory.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { SUBSCRIPTION_ACTIONS } from 'constants/subscription.constant'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AddEquipmentsCategoryProps } from './addEquipmentsCategory.interface'

const AddEquipmentsCategory = ({
    actionType,
    initialValues,
    onSuccess,
}: AddEquipmentsCategoryProps) => {
    const [form] = useForm()
    const { t } = useTranslation()

    const isEditMode = useMemo(
        () => actionType === ACTION_TYPE.EDIT,
        [actionType]
    )

    const handleSubmit = async (): Promise<void> => {
        await form.validateFields()
        try {
            const data = form.getFieldsValue()

            isEditMode
                ? await updateEquipmentCategory(initialValues?._id ?? '', data)
                : await addEquipmentCategory(data)

            message.success(
                isEditMode
                    ? SUBSCRIPTION_ACTIONS.EDIT.successMessage
                    : SUBSCRIPTION_ACTIONS.ADD.successMessage
            )
            onSuccess()
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const modalProps = {
        title: t('label.action-entity', {
            entity: t('label.category'),
            action: t(`label.${isEditMode ? 'update' : 'add'}`),
        }),
        width: 750,
        onOk: handleSubmit,
    }

    return (
        <BaseModal modalProps={modalProps}>
            <Form
                autoComplete="off"
                form={form}
                initialValues={initialValues}
                layout="vertical"
                validateMessages={VALIDATION_MESSAGES}
                onFinish={handleSubmit}>
                <Form.Item
                    label={t('label.entity-name', {
                        entity: t('label.category'),
                    })}
                    name="category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item label={t('label.description')} name="description">
                    <TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
                </Form.Item>
            </Form>
        </BaseModal>
    )
}

export default AddEquipmentsCategory
