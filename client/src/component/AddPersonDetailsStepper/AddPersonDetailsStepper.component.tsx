import { Button, Modal, Space, Steps } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AxiosError } from 'axios'
import message from 'component/CustomMessage/CustomMessage'
import ContactDetails from 'component/ProfileDetails/ContactDetails/ContactDetails.component'
import PersonalDetails from 'component/ProfileDetails/PersonalDetails/PersonalDetails.component'
import ProfileImage from 'component/ProfileDetails/ProfileImage/ProfileImage.component'
import { addClients } from 'component/rest/client.rest'
import { addTrainer } from 'component/rest/trainer.rest'
import { PROFILE_STEPPER } from 'constants/stepper.constant'
import { ENTITY_TYPE } from 'enums/common.enums'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AddPersonDetailStepperProps } from './addPersonDetailsStepper.interface'
import './stepper.less'

const AddPersonDetailsStepper = ({
    open,
    entityType,
    closeModal,
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

    const footerButton = useMemo(
        () => (
            <Space className="d-flex justify-end">
                {activeStep === 0 && (
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            closeModal()
                            resetFormFields()
                        }}>
                        {t('label.cancel')}
                    </Button>
                )}

                {activeStep > 0 && (
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={handlePrevious}>
                        {t('label.previous')}
                    </Button>
                )}

                {activeStep < stepperLength - 1 && (
                    <Button type="primary" onClick={handleNext}>
                        {t('label.next')}
                    </Button>
                )}
                {activeStep === stepperLength - 1 && (
                    <Button
                        htmlType="submit"
                        loading={isLoading}
                        type="primary"
                        onClick={handleSubmit}>
                        {t('label.save')}
                    </Button>
                )}
            </Space>
        ),
        [
            isLoading,
            activeStep,
            stepperLength,
            closeModal,
            handleNext,
            handlePrevious,
            handleSubmit,
            resetFormFields,
        ]
    )

    return (
        <Modal
            destroyOnClose
            className="add-stepper-model"
            closable={false}
            footer={footerButton}
            open={open}
            title="Add Client"
            width={700}>
            <Steps
                className="p-t-xxs p-b-xlg add-stepper"
                current={activeStep}
                items={PROFILE_STEPPER}
                labelPlacement="vertical"
                size="small"
            />

            <div className="stepper-content">{renderStepperData}</div>
        </Modal>
    )
}

export default AddPersonDetailsStepper
