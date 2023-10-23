import { Avatar, Dropdown, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import UserProfileIcon from 'component/User/UserProfileIcon/UserProfileIcon.component'
import { refreshPage } from 'component/utils/common.utils'
import {
    SupportedLocales,
    languageSelectOptions,
} from 'component/utils/i18next/i18nextUtils'
import { CookieStorage } from 'cookie-storage'
import i18next from 'i18next'
import { upperCase } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import ProductLogo from '../../assets/img/logo.png'
import { ReactComponent as DropDownIcon } from '../../assets/svg/dropdown.svg'

import './navbar.less'

const cookieStorage = new CookieStorage()

const Navbar: React.FC = () => {
    const language = useMemo(
        () =>
            (cookieStorage.getItem('i18next') as SupportedLocales) ??
            SupportedLocales.English,
        [cookieStorage]
    )

    const handleLanguageChange = useCallback(
        ({ key }: { key: string }) => {
            i18next.changeLanguage(key)
            refreshPage()
        },
        [refreshPage]
    )

    return (
        <Header className="navbar-container">
            <Avatar className="company-logo" src={<img src={ProductLogo} />} />

            <Space size="large">
                <Dropdown
                    className="cursor-pointer"
                    menu={{
                        items: languageSelectOptions,
                        onClick: handleLanguageChange,
                    }}
                    placement="bottomRight"
                    trigger={['click']}>
                    <div className="user-profile-dropdown">
                        {upperCase(
                            (language || SupportedLocales.English).split('-')[0]
                        )}

                        <DropDownIcon
                            className="align-middle m-l-xs"
                            height={14}
                            width={14}
                        />
                    </div>
                </Dropdown>

                <UserProfileIcon />
            </Space>
        </Header>
    )
}

export default Navbar
