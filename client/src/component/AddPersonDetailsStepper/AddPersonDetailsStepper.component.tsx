import { Steps } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AxiosError } from 'axios'
import BaseModal from 'component/BaseModal/BaseModal'
import { ModalFooterProps } from 'component/BaseModal/modal.interface'
import message from 'component/CustomMessage/CustomMessage'
import ContactDetails from 'component/ProfileDetails/ContactDetails/ContactDetails.component'
import PersonalDetails from 'component/ProfileDetails/PersonalDetails/PersonalDetails.component'
import ProfileImage from 'component/ProfileDetails/ProfileImage/ProfileImage.component'
import { addClients } from 'component/rest/client.rest'
import { addTrainer } from 'component/rest/trainer.rest'
import { modalFooterButton } from 'component/utils/modal.utils'
import { PROFILE_STEPPER } from 'constants/stepper.constant'
import dayjs from 'dayjs'
import { ENTITY_TYPE } from 'enums/common.enums'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AddPersonDetailStepperProps } from './addPersonDetailsStepper.interface'
import './stepper.less'

const AddPersonDetailsStepper = ({
    entityType,
    initialValues,
    onSuccess,
}: AddPersonDetailStepperProps) => {
    const { t } = useTranslation()
    const [form] = useForm()
    const [data, setData] = useState({})
    const [activeStep, setActiveStep] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isEditMode = useMemo(() => true, [entityType])

    const stepperLength = useMemo(() => PROFILE_STEPPER.length, [])

    const resetFormFields = useCallback(() => form.resetFields(), [form])

    const renderStepperData = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <ProfileImage />
            case 1:
                return (
                    <PersonalDetails
                        entityType={entityType}
                        form={form}
                        isEditMode={isEditMode}
                    />
                )

            case 2:
                return <ContactDetails form={form} />

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

            if (entityType === ENTITY_TYPE.CLIENT) {
                await addClients({ ...data, ...lastStepData })
            } else {
                await addTrainer({ ...data, ...lastStepData })
            }
            onSuccess()
            message.success(
                t('message.entity-action-successfully', {
                    entity: entityType,
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

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                dateOfJoining: dayjs(initialValues.dateOfJoining),
            })
        }
    }, [initialValues])

    const modalProps = {
        title: t('label.action-entity', {
            entity: t('label.client'),
            action: t(`label.${isEditMode ? 'update' : 'add'}`),
        }),
        width: 750,
        onOk: handleSubmit,
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
    }

    return (
        <BaseModal modalProps={modalProps}>
            <Steps
                className="p-t-xxs p-b-xlg add-stepper"
                current={activeStep}
                items={PROFILE_STEPPER}
                labelPlacement="vertical"
                size="small"
            />

            <div className="stepper-content">{renderStepperData}</div>
        </BaseModal>
    )
}

export default AddPersonDetailsStepper
