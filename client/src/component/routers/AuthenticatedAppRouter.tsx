import APP_ROUTE from 'component/utils/router'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('../../pages/dashboard/Dashboard.page'))
const Client = lazy(() => import('../../pages/client/Client.page'))
const ClientDetailPage = lazy(
    () => import('../client/ClientDetailPage.component')
)
const Trainer = lazy(() => import('../../pages/trainer/Trainer.page'))
const TrainerDetailPage = lazy(() => import('../trainer/TrainerDetailPage'))
const Gyms = lazy(() => import('../../pages/gym/Gym.page'))
const PageNotFound = lazy(() => import('../page-not-found/PageNotFound'))

const AuthenticatedAppRouter: React.FC = () => {
    return (
        <Suspense fallback="Loading.....">
            <Routes>
                <Route element={<Dashboard />} path={APP_ROUTE.HOME} />
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
