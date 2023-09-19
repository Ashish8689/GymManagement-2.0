import React, { FC, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import APP_ROUTE from '../utils/router'
import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Layout, Menu, MenuProps, Spin } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import { UserAddOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { useAuthProvider } from '../AuthProvider/AuthProvider'

const Dashboard = lazy(() => import('../../pages/Dashboard'))
const Client = lazy(() => import('../../pages/Client'))
const ClientDetailPage = lazy(
    () => import('../client/ClientDetailPage.component')
)
const Trainer = lazy(() => import('../../pages/Trainer'))
const TrainerDetailPage = lazy(() => import('../trainer/TrainerDetailPage'))
const Gyms = lazy(() => import('../../pages/Gyms'))
const Login = lazy(() => import('../../pages/Login'))
const PageNotFound = lazy(() => import('../page-not-found/PageNotFound'))

const SIDEBAR_LIST = [
    {
        key: 1,
        label: 'Dashboard',
        route: APP_ROUTE.DASHBOARD,
        icon: <UserAddOutlined />,
    },
    {
        key: 2,
        label: 'Clients',
        route: APP_ROUTE.CLIENT,
        icon: <UserAddOutlined />,
    },
    {
        key: 3,
        label: 'Trainers',
        route: APP_ROUTE.TRAINER,
        icon: <UserAddOutlined />,
    },
    {
        key: 4,
        label: 'Gyms',
        route: APP_ROUTE.GYMS,
        icon: <UserAddOutlined />,
    },
]

const PROFILE_MENU = (
    <Menu
        items={[
            {
                label: 'Ashish Gupta',
                key: '0',
            },
            {
                label: 'Admin',
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: 'Logout',
                key: '3',
            },
        ]}
    />
)

const AppRouter: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated } = useAuthProvider()

    const onMenuItemClick: MenuProps['onClick'] = (e): void => {
        navigate(SIDEBAR_LIST.find((list) => list.key === +e.key)?.route || '/')
    }

    if (isAuthenticated) {
        return (
            <Layout>
                <Header
                    className="bg-white shadow-sm"
                    style={{
                        position: 'sticky',
                        top: 0,
                        left: 0,
                        padding: 0,
                        zIndex: 999,
                    }}
                >
                    {' '}
                    <div className="flex h-16 w-full items-center justify-between px-5 text-center">
                        <img
                            className="ml-14 h-11 w-11 object-contain"
                            src={process.env.PUBLIC_URL + 'images/logo.png'}
                        />

                        <Dropdown overlay={PROFILE_MENU} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Avatar
                                    className="cursor-pointer bg-primary-light text-primary shadow-sm"
                                    size="large"
                                >
                                    A
                                </Avatar>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Sider
                    className="shadow-md"
                    style={{
                        overflow: 'auto',
                        position: 'fixed',
                        left: 3,
                        top: 70,
                        bottom: 0,
                        borderRadius: 10,
                        margin: 10,
                    }}
                    theme="light"
                    trigger={null}
                >
                    <Menu
                        defaultSelectedKeys={[
                            SIDEBAR_LIST.find(
                                (list) => list.route === location.pathname
                            )?.key.toString() || '1',
                        ]}
                        items={SIDEBAR_LIST}
                        mode="inline"
                        theme="light"
                        onClick={onMenuItemClick}
                    />
                </Sider>
                <Layout
                    className="site-layout"
                    style={{
                        margin: '15px 15px 10px 265px',
                    }}
                >
                    <Content
                        className="rounded-2xl bg-white shadow-md"
                        style={{
                            overflow: 'initial',
                            // margin: 10,
                        }}
                    >
                        <Suspense fallback="Loading.....">
                            <Routes>
                                <Route
                                    element={<Dashboard />}
                                    path={APP_ROUTE.DASHBOARD}
                                />
                                <Route element={<PageNotFound />} />

                                <Route
                                    element={<Client />}
                                    path={APP_ROUTE.CLIENT}
                                />
                                <Route
                                    element={<ClientDetailPage />}
                                    path={APP_ROUTE.CLIENT_DETAILS}
                                />
                                <Route
                                    element={<Trainer />}
                                    path={APP_ROUTE.TRAINER}
                                />
                                <Route
                                    element={<TrainerDetailPage />}
                                    path={APP_ROUTE.TRAINER_DETAILS}
                                />
                                <Route
                                    element={<Gyms />}
                                    path={APP_ROUTE.GYMS}
                                />
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        )
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
