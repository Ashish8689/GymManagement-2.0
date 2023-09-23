import { FunctionComponent } from 'react'
import AppRouter from './component/routers/app.routers'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './component/AuthProvider/AuthProvider'
import { I18nextProvider } from 'react-i18next'
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
                },
            }}
        >
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    <AuthProvider>
                        <AppRouter />
                    </AuthProvider>
                </I18nextProvider>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App
