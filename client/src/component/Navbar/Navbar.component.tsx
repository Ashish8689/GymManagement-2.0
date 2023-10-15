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
        <Header
            className="bg-white shadow-sm"
            style={{
                position: 'sticky',
                top: 0,
                left: 0,
                padding: 0,
                zIndex: 999,
            }}>
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
            <div className="flex h-16 w-full items-center justify-between px-5 text-center" />
        </Header>
    )
}

export default Navbar
