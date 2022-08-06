import { ReactNode } from 'react'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import { Layout, Menu, MenuProps } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import Image from 'next/image'
import { UserAddOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const SIDEBAR_LIST = [
    {
        key: 1,
        label: 'Dashboard',
        route: '/',
        icon: <UserAddOutlined />,
    },
    {
        key: 2,
        label: 'Add Clients',
        route: '/addClients',
        icon: <UserAddOutlined />,
    },
    {
        key: 3,
        label: 'Clients',
        route: '/clients',
        icon: <UserAddOutlined />,
    },
    {
        key: 4,
        label: 'Add Trainers',
        route: '/addClients',
        icon: <UserAddOutlined />,
    },
    {
        key: 5,
        label: 'Trainers',
        route: '/trainers',
        icon: <UserAddOutlined />,
    },
    {
        key: 6,
        label: 'Gyms',
        route: '/',
        icon: <UserAddOutlined />,
    },
]

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
    const router = useRouter()

    const onMenuItemClick: MenuProps['onClick'] = (e): void => {
        router.push(
            SIDEBAR_LIST.find((list) => list.key === +e.key)?.route || '/'
        )
    }

    return (
        <Provider store={store}>
            <Layout id="app">
                <Header className="header">
                    <div className="flex h-full w-24 items-center justify-center">
                        <Image
                            alt="Gym Management"
                            height={50}
                            src="/images/logo.png"
                            width={50}
                        />
                    </div>
                </Header>

                <Sider className="sidebar">
                    <Menu
                        className="border-0 bg-bold-light text-white"
                        defaultSelectedKeys={['1']}
                        items={SIDEBAR_LIST}
                        mode="inline"
                        onClick={onMenuItemClick}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Content className="m-4 mt-20 overflow-auto rounded-xl bg-bold-light">
                        <Component {...pageProps} />
                    </Content>
                </Layout>
            </Layout>
        </Provider>
    )
}

export default MyApp
