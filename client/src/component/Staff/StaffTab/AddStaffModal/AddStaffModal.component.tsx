import { Form, Input } from 'antd'
import { AxiosError } from 'axios'
import BaseModal from 'component/BaseModal/BaseModal'
import message from 'component/CustomMessage/CustomMessage'
import { addStaffAPI, updateStaffAPI } from 'component/rest/Staff/staff.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AddStaffModalProps } from './AddStaffModal.interface'

const AddStaffModal = ({
    actionType,
    initialValues,
    onSuccess,
}: AddStaffModalProps) => {
    const [form] = Form.useForm()
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
                ? await updateStaffAPI(initialValues?._id ?? '', data)
                : await addStaffAPI(data)

            message.success(
                t('message.entity-action-successfully', {
                    entity: t('label.staff'),
                    action: t(
                        `label.${isEditMode ? 'updated' : 'added'}-lowercase`
                    ),
                })
            )
            onSuccess()
        } catch (error) {
            message.error(error as AxiosError)
        }
    }

    const modalProps = {
        title: t('label.action-entity', {
            entity: t('label.staff'),
            action: t(`label.${isEditMode ? 'update' : 'add'}`),
        }),

        onOk: handleSubmit,
    }

    return (
        <BaseModal modalProps={modalProps} width={500}>
            <Form
                autoComplete="off"
                form={form}
                initialValues={initialValues}
                layout="vertical"
                validateMessages={VALIDATION_MESSAGES}
                onFinish={handleSubmit}>
                <Form.Item
                    label={t('label.entity-name', {
                        entity: t('label.name'),
                    })}
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
            </Form>
        </BaseModal>
    )
}

export default AddStaffModal
