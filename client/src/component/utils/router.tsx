const PLACEHOLDER_CODE = ':code'

export const AppRoute = {
    LOGIN: '/login',
    DASHBOARD: '/',
    CLIENT: '/client',
    CLIENT_DETAILS: `/client/${PLACEHOLDER_CODE}`,
    ACTIVE_LIST: '/activeList',
    SUSPEND_LIST: '/suspendList',
    TRAINER: '/trainer',
    TRAINER_DETAILS: `/trainer/${PLACEHOLDER_CODE}`,
    GYMS: '/gyms',
}

export default AppRoute
