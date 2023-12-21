import { Button, Space } from 'antd'
import { ModalFooterFunctionProps } from 'component/BaseModal/modal.interface'
import i18n from './i18next/LocalUtils'

export const modalFooterButton = ({
    isLoading,
    activeStep,
    stepperLength,
    onSave,
    onCancel,
    handleNext,
    handlePrevious,
}: ModalFooterFunctionProps) => (
    <Space className="d-flex justify-end">
        {activeStep === 0 && (
            <Button style={{ margin: '0 8px' }} onClick={onCancel}>
                {i18n.t('label.cancel')}
            </Button>
        )}

        {activeStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={handlePrevious}>
                {i18n.t('label.previous')}
            </Button>
        )}

        {activeStep < stepperLength - 1 && (
            <Button type="primary" onClick={handleNext}>
                {i18n.t('label.next')}
            </Button>
        )}
        {activeStep === stepperLength - 1 && (
            <Button
                htmlType="submit"
                loading={isLoading}
                type="primary"
                onClick={onSave}>
                {i18n.t('label.save')}
            </Button>
        )}
    </Space>
)
