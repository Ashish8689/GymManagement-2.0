import { Spin } from 'antd'
import AppContainer from 'component/AppContainer/AppContainer.component'
import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthProvider } from '../AuthProvider/AuthProvider'
import APP_ROUTE from '../utils/router'

const Login = lazy(() => import('../../pages/Login/Login'))

const AppRouter: FC = () => {
    const { isAuthenticated } = useAuthProvider()

    if (isAuthenticated) {
        return <AppContainer />
    }

    return (
        <Suspense fallback={<Spin size="large" />}>
            <Routes>
                <Route element={<Login />} path={APP_ROUTE.LOGIN} />
                {/* No match found, redirect to login path */}
                <Route
                    element={<Navigate replace to={APP_ROUTE.LOGIN} />}
                    path="*"
                />
            </Routes>
        </Suspense>
    )
}

export default AppRouter
