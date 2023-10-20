import { Avatar, Dropdown, Menu, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { refreshPage } from 'component/utils/common.utils'
import {
    SupportedLocales,
    languageSelectOptions,
} from 'component/utils/i18next/i18nextUtils'
import { CookieStorage } from 'cookie-storage'
import i18next from 'i18next'
import { upperCase } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { ReactComponent as DropDownIcon } from '../../assets/svg/dropdown.svg'
import './navbar.less'

const cookieStorage = new CookieStorage()

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

    const language = useMemo(
        () =>
            (cookieStorage.getItem('i18next') as SupportedLocales) ||
            SupportedLocales.English,
        []
    )

    const handleLanguageChange = useCallback(({ key }: { key: string }) => {
        i18next.changeLanguage(key)
        refreshPage()
    }, [])

    return (
        <Header className="navbar-container">
            <Space align="center" className="justify-between w-full">
                <Avatar
                    src={
                        <img src={process.env.PUBLIC_URL + 'images/logo.png'} />
                    }
                />

                <Space size="large">
                    <Dropdown
                        className="cursor-pointer"
                        menu={{
                            items: languageSelectOptions,
                            onClick: handleLanguageChange,
                        }}
                        placement="bottomRight"
                        trigger={['click']}>
                        <Space align="center">
                            {upperCase(
                                (language || SupportedLocales.English).split(
                                    '-'
                                )[0]
                            )}
                            <DropDownIcon
                                className="align-middle"
                                height={14}
                                width={14}
                            />
                        </Space>
                    </Dropdown>

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
            </Space>
        </Header>
    )
}

export default Navbar
