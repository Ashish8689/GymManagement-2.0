import APP_ROUTE from 'component/utils/router'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('../../pages/Dashboard'))
const Client = lazy(() => import('../../pages/Client'))
const ClientDetailPage = lazy(
    () => import('../client/ClientDetailPage.component')
)
const Trainer = lazy(() => import('../../pages/Trainer'))
const TrainerDetailPage = lazy(() => import('../trainer/TrainerDetailPage'))
const Gyms = lazy(() => import('../../pages/Gyms'))
const PageNotFound = lazy(() => import('../page-not-found/PageNotFound'))

const AuthenticatedAppRouter: React.FC = () => {
    return (
        <Suspense fallback="Loading.....">
            <Routes>
                <Route element={<Dashboard />} path={APP_ROUTE.DASHBOARD} />
                <Route element={<PageNotFound />} />

                <Route element={<Client />} path={APP_ROUTE.CLIENT} />
                <Route
                    element={<ClientDetailPage />}
                    path={APP_ROUTE.CLIENT_DETAILS}
                />
                <Route element={<Trainer />} path={APP_ROUTE.TRAINER} />
                <Route
                    element={<TrainerDetailPage />}
                    path={APP_ROUTE.TRAINER_DETAILS}
                />
                <Route element={<Gyms />} path={APP_ROUTE.GYMS} />
            </Routes>
        </Suspense>
    )
}

export default AuthenticatedAppRouter
