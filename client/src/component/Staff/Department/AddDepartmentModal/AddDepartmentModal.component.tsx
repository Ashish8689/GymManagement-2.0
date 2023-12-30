import { Form, Input } from 'antd'
import { AxiosError } from 'axios'
import BaseModal from 'component/BaseModal/BaseModal'
import message from 'component/CustomMessage/CustomMessage'
import {
    addStaffDepartmentAPI,
    updateStaffDepartmentAPI,
} from 'component/rest/Staff/staffDepartment.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AddDepartmentModalProps } from './AddDepartmentModal.interface'

const AddDepartmentModal = ({
    actionType,
    initialValues,
    onSuccess,
}: AddDepartmentModalProps) => {
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
                ? await updateStaffDepartmentAPI(initialValues?._id ?? '', data)
                : await addStaffDepartmentAPI(data)

            message.success(
                t('message.entity-action-successfully', {
                    entity: t('label.department'),
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
            entity: t('label.department'),
            action: t(`label.${isEditMode ? 'update' : 'add'}`),
        }),

        onOk: handleSubmit,
        width: 500,
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
                        entity: t('label.department'),
                    })}
                    name="department"
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

export default AddDepartmentModal
