import APP_ROUTE from 'component/utils/router'
import React from 'react'
import { ErrorBoundary as ErrorBoundaryWrapper } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import ErrorFallback from './ErrorFallback.component'

interface Props {
    children: React.ReactNode
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate()

    const onErrorReset = () => {
        navigate(APP_ROUTE.HOME)
    }

    return (
        <ErrorBoundaryWrapper
            FallbackComponent={ErrorFallback}
            onReset={onErrorReset}>
            {children}
        </ErrorBoundaryWrapper>
    )
}

export default ErrorBoundary
