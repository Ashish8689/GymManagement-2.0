import { ConfigProvider } from 'antd'
import ErrorBoundary from 'component/ErrorBoundary/ErrorBoundary.component'
import { FunctionComponent } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './component/AuthProvider/AuthProvider'
import AppRouter from './component/routers/AppRouter'
import i18n from './component/utils/i18next/LocalUtils'

// '@primary-color': '#7147E8',
// '@success-color': '#17b978',
// '@error-color': '#ff304f',

const App: FunctionComponent = () => {
    return (
        <ConfigProvider
            theme={{
                hashed: false,
                token: {
                    colorPrimary: '#7147E8',
                    colorLink: '#7147E8',
                },
            }}>
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    <ErrorBoundary>
                        <AuthProvider>
                            <AppRouter />
                        </AuthProvider>
                    </ErrorBoundary>
                </I18nextProvider>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App
