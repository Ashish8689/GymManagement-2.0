import { UserAddOutlined } from '@ant-design/icons'
import i18n from 'component/utils/i18next/LocalUtils'
import APP_ROUTE from 'component/utils/router'

export const SIDEBAR_LIST = [
    {
        key: 1,
        label: i18n.t('label.dashboard'),
        route: APP_ROUTE.HOME,
        icon: <UserAddOutlined />,
    },
    {
        key: 2,
        label: i18n.t('label.client-plural'),
        route: APP_ROUTE.CLIENT,
        icon: <UserAddOutlined />,
    },
    {
        key: 3,
        label: i18n.t('label.trainer-plural'),
        route: APP_ROUTE.TRAINER,
        icon: <UserAddOutlined />,
    },
    {
        key: 4,
        label: i18n.t('label.branch-plural'),
        route: APP_ROUTE.GYMS,
        icon: <UserAddOutlined />,
    },
    {
        key: 5,
        label: i18n.t('label.subscription-plural'),
        route: APP_ROUTE.SUBSCRIPTION,
        icon: <UserAddOutlined />,
    },
    {
        key: 6,
        label: i18n.t('label.gym-equipment-plural'),
        route: APP_ROUTE.GYM_EQUIPMENTS_CATEGORY,
        icon: <UserAddOutlined />,
    },
    {
        key: 7,
        label: i18n.t('label.staff-plural'),
        route: APP_ROUTE.STAFF,
        icon: <UserAddOutlined />,
    },
]
