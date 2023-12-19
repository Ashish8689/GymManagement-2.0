import { Button, Space, Steps } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AxiosError } from 'axios'
import BaseModal from 'component/BaseModal/BaseModal'
import { ModalFooterProps } from 'component/BaseModal/modal.interface'
import message from 'component/CustomMessage/CustomMessage'
import { addEquipment } from 'component/rest/equipmentCategory.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { EQUIPMENT_STEPPER } from 'constants/stepper.constant'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import EquipmentForm from '../StepperComponent/EquipmentForm.component'
import PricingFrom from '../StepperComponent/PricingFrom.component'
import VendorForm from '../StepperComponent/VendorForm.component'
import { AddEquipmentStepperProps } from './AddEquipmentStepperModal.interface'

const AddEquipmentStepperModal = ({
    actionType,
    category,
    onSuccess,
}: AddEquipmentStepperProps) => {
    const { t } = useTranslation()
    const [form] = useForm()
    const [data, setData] = useState({})
    const [activeStep, setActiveStep] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const stepperLength = useMemo(() => EQUIPMENT_STEPPER.length, [])

    const resetFormFields = useCallback(() => form.resetFields(), [form])

    const isEditMode = useMemo(
        () => actionType === ACTION_TYPE.EDIT,
        [actionType]
    )

    const renderStepperData = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <EquipmentForm form={form} />
            case 1:
                return <VendorForm form={form} />

            case 2:
                return <PricingFrom form={form} />

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

            await addEquipment({
                ...data,
                ...lastStepData,
                category,
            })

            onSuccess()
            message.success(
                t('message.entity-action-successfully', {
                    entity: t('label.equipment'),
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

    const footerButton = useCallback(
        ({ onSave, onCancel }: ModalFooterProps) => (
            <Space className="d-flex justify-end">
                {activeStep === 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={onCancel}>
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
                        onClick={onSave}>
                        {t('label.save')}
                    </Button>
                )}
            </Space>
        ),
        [isLoading, activeStep, stepperLength, handleNext, handlePrevious]
    )

    const modalProps = {
        title: t('label.action-entity', {
            entity: t('label.category'),
            action: t(`label.${isEditMode ? 'update' : 'add'}`),
        }),
        width: 750,
        onOk: handleSubmit,
        footer: footerButton,
    }

    return (
        <BaseModal modalProps={modalProps}>
            <Steps
                className="p-t-xxs p-b-xlg add-stepper"
                current={activeStep}
                items={EQUIPMENT_STEPPER}
                labelPlacement="vertical"
                size="small"
            />

            <div className="stepper-content">{renderStepperData}</div>
        </BaseModal>
    )
}

export default AddEquipmentStepperModal
