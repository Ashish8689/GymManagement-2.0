import { UserAddOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import APP_ROUTE from 'component/utils/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const SIDEBAR_LIST = [
        {
            key: 1,
            label: t('label.dashboard'),
            route: APP_ROUTE.HOME,
            icon: <UserAddOutlined />,
        },
        {
            key: 2,
            label: t('label.client-plural'),
            route: APP_ROUTE.CLIENT,
            icon: <UserAddOutlined />,
        },
        {
            key: 3,
            label: t('label.trainer-plural'),
            route: APP_ROUTE.TRAINER,
            icon: <UserAddOutlined />,
        },
        {
            key: 4,
            label: t('label.branch-plural'),
            route: APP_ROUTE.GYMS,
            icon: <UserAddOutlined />,
        },
        {
            key: 5,
            label: t('label.subscription-plural'),
            route: APP_ROUTE.SUBSCRIPTION,
            icon: <UserAddOutlined />,
        },
        {
            key: 6,
            label: t('label.gym-equipment-plural'),
            route: APP_ROUTE.GYM_EQUIPMENTS,
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
                onClick={onMenuItemClick}
            />
        </Sider>
    )
}

export default Sidebar
