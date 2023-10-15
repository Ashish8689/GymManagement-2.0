import { Avatar, Dropdown, Menu, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'

const Navbar: React.FC = () => {
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

    return (
        <Header className="navbar-container">
            <Space align="center" className="justify-between w-full">
                <Avatar
                    src={
                        <img
                            className="ml-14 h-11 w-11 object-contain"
                            src={process.env.PUBLIC_URL + 'images/logo.png'}
                        />
                    }
                />

                <Dropdown overlay={PROFILE_MENU} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar
                            className="cursor-pointer bg-primary-light text-primary shadow-sm"
                            size="large">
                            A
                        </Avatar>
                    </a>
                </Dropdown>
            </Space>
        </Header>
    )
}

export default Navbar
