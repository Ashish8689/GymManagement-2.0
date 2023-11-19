import { Spin } from 'antd'
import APP_ROUTE from 'component/utils/router'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard.page'))
const ClientPage = lazy(() => import('../../pages/Client/Client.page'))
const ClientDetailPage = lazy(
    () => import('../client/ClientDetailPage.component')
)

const TrainerPage = lazy(() => import('../../pages/Trainer/Trainer.page'))
const TrainerDetailPage = lazy(() => import('../trainer/TrainerDetailPage'))
const Gyms = lazy(() => import('../../pages/Gym/Gym.page'))

const SubscriptionPage = lazy(
    () => import('../../pages/Subscription/Subscription.page')
)
const EquipmentCategory = lazy(
    () => import('../../pages/EquipmentsCategory/EquipmentsCategory.page')
)

const PageNotFound = lazy(() => import('../page-not-found/PageNotFound'))

const AuthenticatedAppRouter: React.FC = () => {
    return (
        <Suspense
            fallback={
                <div className="app-loading">
                    <Spin size="large" />
                </div>
            }>
            <Routes>
                <Route element={<Dashboard />} path={APP_ROUTE.HOME} />
                <Route element={<PageNotFound />} />
                <Route element={<ClientPage />} path={APP_ROUTE.CLIENT} />
                <Route
                    element={<ClientDetailPage />}
                    path={APP_ROUTE.CLIENT_DETAILS}
                />
                <Route element={<TrainerPage />} path={APP_ROUTE.TRAINER} />
                <Route
                    element={<TrainerDetailPage />}
                    path={APP_ROUTE.TRAINER_DETAILS}
                />
                <Route element={<Gyms />} path={APP_ROUTE.GYMS} />

                <Route
                    element={<SubscriptionPage />}
                    path={APP_ROUTE.SUBSCRIPTION}
                />

                <Route
                    element={<EquipmentCategory />}
                    path={APP_ROUTE.GYM_EQUIPMENTS}
                />
            </Routes>
        </Suspense>
    )
}

export default AuthenticatedAppRouter
