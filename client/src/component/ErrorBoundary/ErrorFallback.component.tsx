import { Button, Result } from 'antd'
import { ERROR_500 } from 'constants/common'
import { t } from 'i18next'
import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <Result
            extra={
                <Button
                    className="ant-btn-primary-custom"
                    type="primary"
                    onClick={resetErrorBoundary}>
                    {t('label.home')}
                </Button>
            }
            status="404"
            subTitle={error.message}
            title={ERROR_500}
        />
    )
}

export default ErrorFallback
