import { UserAddOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import APP_ROUTE from 'component/utils/router'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
    const navigate = useNavigate()

    const SIDEBAR_LIST = [
        {
            key: 1,
            label: 'Dashboard',
            route: APP_ROUTE.HOME,
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

    const onMenuItemClick: MenuProps['onClick'] = (e): void =>
        navigate(SIDEBAR_LIST.find((list) => list.key === +e.key)?.route ?? '/')

    return (
        <Sider className="sidebar" trigger={null}>
            <Menu
                className="sidebar-menu"
                defaultSelectedKeys={[
                    SIDEBAR_LIST.find(
                        (list) => list.route === location.pathname
                    )?.key.toString() || '1',
                ]}
                items={SIDEBAR_LIST}
                // mode="inline"
                onClick={onMenuItemClick}
            />
        </Sider>
    )
}

export default Sidebar