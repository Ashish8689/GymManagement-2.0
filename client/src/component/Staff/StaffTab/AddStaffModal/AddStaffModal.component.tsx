import { Form, Steps } from 'antd'
import { AxiosError } from 'axios'
import BaseModal from 'component/BaseModal/BaseModal'
import { ModalFooterProps } from 'component/BaseModal/modal.interface'
import message from 'component/CustomMessage/CustomMessage'
import ContactDetails from 'component/ProfileDetails/ContactDetails/ContactDetails.component'
import PersonalDetails from 'component/ProfileDetails/PersonalDetails/PersonalDetails.component'
import ProfileImage from 'component/ProfileDetails/ProfileImage/ProfileImage.component'
import WorkInformation from 'component/ProfileDetails/WorkInformation/WorkInformation.component'
import { addStaffAPI, updateStaffAPI } from 'component/rest/Staff/staff.rest'
import { modalFooterButton } from 'component/utils/modal.utils'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'constants/common.constant'
import { STAFF_STEPPER } from 'constants/stepper.constant'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AddStaffModalProps } from './AddStaffModal.interface'

const AddStaffModal = ({
    actionType,
    initialValues,
    onSuccess,
}: AddStaffModalProps) => {
    const [form] = Form.useForm()
    const { t } = useTranslation()

    const [data, setData] = useState({})
    const [activeStep, setActiveStep] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const stepperLength = useMemo(() => STAFF_STEPPER.length, [])

    const isEditMode = useMemo(
        () => actionType === ACTION_TYPE.EDIT,
        [actionType]
    )

    const resetFormFields = useCallback(() => form.resetFields(), [form])

    const renderStepperData = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <ProfileImage />
            case 1:
                return (
                    <PersonalDetails
                        entityType={ENTITY_TYPE.STAFF}
                        form={form}
                    />
                )

            case 2:
                return <ContactDetails form={form} />

            case 3:
                return <WorkInformation form={form} />

            default:
                return <></>
        }
    }, [activeStep])

    const handleNext = useCallback(async () => {
        await form.validateFields()

        const formData = form.getFieldsValue()
        setData((prev) => ({ ...prev, ...formData }))

        setActiveStep((prev) => prev + 1)
    }, [setActiveStep])

    const handlePrevious = useCallback(() => {
        setActiveStep((prev) => prev - 1)
    }, [setActiveStep])

    const handleSubmit = async () => {
        await form.validateFields()
        try {
            setIsLoading(true)

            const lastStepData = form.getFieldsValue()

            isEditMode
                ? await updateStaffAPI(initialValues?._id ?? '', {
                      ...data,
                      ...lastStepData,
                  })
                : await addStaffAPI({ ...data, ...lastStepData })

            onSuccess()
            message.success(
                t('message.entity-action-successfully', {
                    entity: t('label.staff'),
                    action: t(
                        `label.${isEditMode ? 'updated' : 'added'}-lowercase`
                    ),
                })
            )
        } catch (error) {
            message.error(error as AxiosError)
        } finally {
            setIsLoading(false)
            setActiveStep(0)
            resetFormFields()
        }
    }

    const modalProps = {
        title: t('label.action-entity', {
            entity: t('label.staff'),
            action: t(`label.${isEditMode ? 'update' : 'add'}`),
        }),
        footer: ({ onSave, onCancel }: ModalFooterProps) =>
            modalFooterButton({
                isLoading,
                activeStep,
                stepperLength,
                onSave,
                onCancel,
                handleNext,
                handlePrevious,
            }),
        onOk: handleSubmit,
        width: 750,
    }

    return (
        <BaseModal modalProps={modalProps}>
            <Steps
                className="p-t-xxs p-b-xlg add-stepper"
                current={activeStep}
                items={STAFF_STEPPER}
                labelPlacement="vertical"
                size="small"
            />

            <div className="stepper-content">{renderStepperData}</div>
        </BaseModal>
    )
}

export default AddStaffModal
