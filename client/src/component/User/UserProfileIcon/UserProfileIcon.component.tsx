import { Avatar, Dropdown, Typography } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useAuthProvider } from 'component/AuthProvider/AuthProvider'
import { getRandomColor } from 'component/utils/common.utils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ReactComponent as DropDownIcon } from '../../../assets/svg/dropdown.svg'
import './user-profile-icon.less'

const UserProfileIcon = () => {
    const { t } = useTranslation()

    const { userDetails, handleLogout } = useAuthProvider()

    const { color, character } = useMemo(
        () => getRandomColor(userDetails?.username ?? ''),
        [userDetails, getRandomColor]
    )

    const items: ItemType[] = useMemo(
        () => [
            {
                key: 'user',
                label: (
                    <Link data-testid="user-name" to="/">
                        <Typography.Paragraph
                            className="ant-typography-ellipsis-custom font-medium cursor-pointer text-link-color m-b-0"
                            ellipsis={{ rows: 1, tooltip: true }}>
                            {userDetails?.username}
                        </Typography.Paragraph>
                    </Link>
                ),
                type: 'group',
            },
            {
                type: 'divider', // Must have
            },
            {
                key: 'roles',
                children: [
                    {
                        key: 'roles',
                        icon: '',
                        label: userDetails?.role,
                    },
                ],
                label: (
                    <span className="dropdown-list-title">
                        {t('label.role-plural')}
                    </span>
                ),
                type: 'group',
            },

            {
                type: 'divider',
            },
            {
                key: 'logout',
                label: (
                    <Typography.Paragraph
                        className="logout-link-button"
                        onClick={handleLogout}>
                        {t('label.logout')}
                    </Typography.Paragraph>
                ),
                type: 'group',
            },
        ],
        [userDetails, handleLogout]
    )

    return (
        <Dropdown
            menu={{
                items,
                defaultOpenKeys: ['roles'],
                rootClassName: 'profile-dropdown',
            }}
            trigger={['click']}>
            <div
                className="user-profile-dropdown"
                data-testid="dropdown-profile">
                <div className="user-profile-content-container">
                    <Avatar
                        className="flex-center"
                        shape="circle"
                        size="large"
                        style={{
                            backgroundColor: color,
                            verticalAlign: 'middle',
                        }}>
                        {character}
                    </Avatar>
                    <div className="user-profile-content">
                        <Typography.Text
                            className="username-name"
                            ellipsis={{ tooltip: true }}>
                            {userDetails?.username}
                        </Typography.Text>
                        <Typography.Text className="user-role">
                            {userDetails?.role}
                        </Typography.Text>
                    </div>
                </div>
                <DropDownIcon className="align-middle" height={14} width={14} />
            </div>
        </Dropdown>
    )
}

export default UserProfileIcon
