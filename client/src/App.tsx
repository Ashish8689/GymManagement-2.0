import { ConfigProvider } from 'antd'
import ErrorBoundary from 'component/ErrorBoundary/ErrorBoundary.component'
import { CONFIG_THEME } from 'constants/common.constant'
import { DepartmentProvider } from 'provider/DepartmentProvider'
import { FunctionComponent } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './component/AuthProvider/AuthProvider'
import AppRouter from './component/routers/AppRouter'
import i18n from './component/utils/i18next/LocalUtils'

const App: FunctionComponent = () => {
    return (
        <ConfigProvider theme={CONFIG_THEME}>
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    <ErrorBoundary>
                        <AuthProvider>
                            <DepartmentProvider>
                                <AppRouter />
                            </DepartmentProvider>
                        </AuthProvider>
                    </ErrorBoundary>
                </I18nextProvider>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App
