import React, { FC, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppRoute } from '../utils/router'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, MenuProps } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import { UserAddOutlined } from '@ant-design/icons'

const Dashboard = lazy(() => import('../../pages/Dashboard'))
const Client = lazy(() => import('../../pages/Client'))
const ClientItem = lazy(() => import('../../component/client/ClientItem'))
const Trainer = lazy(() => import('../../pages/Trainer'))
const TrainerItem = lazy(() => import('../../component/trainer/TrainerItem'))
const Gyms = lazy(() => import('../../pages/Gyms'))

const PageNotFound = lazy(() => import('../page-not-found/PageNotFound'))

// const MemberAll = lazy(() => import('../Content/Member/MemberAll'))
// const ActiveList = lazy(() => import('../Content/Member/ActiveList'))
// const SuspendList = lazy(() => import('../Content/Member/SuspendList'))
// const DetailMemberReport = lazy(
//     () => import('../Content/Member/DetailMemberReport')
// )

const SIDEBAR_LIST = [
    {
        key: 1,
        label: 'Dashboard',
        route: AppRoute.DASHBOARD,
        icon: <UserAddOutlined />,
    },
    {
        key: 2,
        label: 'Clients',
        route: AppRoute.CLIENT,
        icon: <UserAddOutlined />,
    },
    {
        key: 3,
        label: 'Trainers',
        route: AppRoute.TRAINER,
        icon: <UserAddOutlined />,
    },
    {
        key: 4,
        label: 'Gyms',
        route: AppRoute.GYMS,
        icon: <UserAddOutlined />,
    },
]

const AppRouter: FC = () => {
    const navigate = useNavigate()

    const onMenuItemClick: MenuProps['onClick'] = (e): void => {
        navigate(SIDEBAR_LIST.find((list) => list.key === +e.key)?.route || '/')
    }

    // if (!user) {
    return (
        <Layout>
            <Sider
                collapsible
                style={{
                    overflow: 'auto',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                trigger={null}
            >
                <div className="logo-container h-16 w-52 text-center">
                    <img
                        className="h-full w-full object-contain p-3"
                        src={process.env.PUBLIC_URL + 'images/logo.png'}
                    />
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    items={SIDEBAR_LIST}
                    mode="inline"
                    theme="dark"
                    onClick={onMenuItemClick}
                />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: 200,
                }}
            >
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px 16px',
                        overflow: 'initial',
                    }}
                >
                    <div
                        className="site-layout-background rounded-2xl"
                        style={{
                            padding: 24,
                            textAlign: 'center',
                        }}
                    >
                        <Suspense fallback="Loading.....">
                            <Routes>
                                <Route
                                    element={<Dashboard />}
                                    path={AppRoute.DASHBOARD}
                                />
                                <Route element={<PageNotFound />} />

                                <Route
                                    element={<Client />}
                                    path={AppRoute.CLIENT}
                                />
                                <Route
                                    element={<ClientItem />}
                                    path={AppRoute.CLIENT_DETAILS}
                                />
                                <Route
                                    element={<Trainer />}
                                    path={AppRoute.TRAINER}
                                />
                                <Route
                                    element={<TrainerItem />}
                                    path={AppRoute.TRAINER_DETAILS}
                                />
                                <Route
                                    element={<Gyms />}
                                    path={AppRoute.GYMS}
                                />
                                {/* <Route
                                    element={<ActiveList />}
                                    path={AppRoute.ACTIVE_LIST}
                                />
                                <Route
                                    element={<SuspendList />}
                                    path={AppRoute.SUSPEND_LIST}
                                />
                               
                                
                                <Route
                                    element={<DetailMemberReport />}
                                    path={AppRoute.DETAIL_MEMBER}
                                />
                                <Route path={AppRoute.LOGIN}>
                                    <Redirect to={AppRoute.DASHBOARD} />
                                </Route> */}
                            </Routes>
                        </Suspense>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

// return (
//     <Suspense fallback={<Loading />}>
//         <Switch>
//             {/* Login path */}
//             <Route  element={Login} path={AppRoute.LOGIN} />

//             {/* No match found, redirect to login path */}
//             <Redirect to={AppRoute.LOGIN} />
//         </Switch>
//     </Suspense>
// )
// }

export default AppRouter
