import React, { FC, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import APP_ROUTE from '../utils/router'
import { useAuthProvider } from '../AuthProvider/AuthProvider'
import AppContainer from 'component/AppContainer/AppContainer.component'
import { Spin } from 'antd'

const Login = lazy(() => import('../../pages/login/Login'))

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
