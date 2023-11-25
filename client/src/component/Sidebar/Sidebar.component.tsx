import { Menu, MenuProps } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { SIDEBAR_LIST } from 'constants/sidebar.constant'
import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
    const navigate = useNavigate()

    const onMenuItemClick: MenuProps['onClick'] = (e): void =>
        navigate(SIDEBAR_LIST.find((list) => list.key === +e.key)?.route ?? '/')

    const deepSearchNavigation = useCallback(() => {
        const currentRoute = SIDEBAR_LIST.find(
            (list) => list.route === `/${location.pathname.split('/')[1]}`
        )?.key

        return currentRoute?.toString() ?? '1'
    }, [location.pathname])

    const activeSidebarKey = useMemo(() => {
        const currentRoute = SIDEBAR_LIST.find(
            (list) => list.route === location.pathname
        )?.key

        return currentRoute?.toString() ?? deepSearchNavigation()
    }, [location.pathname, deepSearchNavigation])

    return (
        <Sider className="sidebar" trigger={null}>
            <Menu
                className="sidebar-menu"
                defaultSelectedKeys={[activeSidebarKey]}
                items={SIDEBAR_LIST}
                onClick={onMenuItemClick}
            />
        </Sider>
    )
}

export default Sidebar
