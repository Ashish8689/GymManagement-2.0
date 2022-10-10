const PLACEHOLDER_ID = ':id'

export const AppRoute = {
    LOGIN: '/login',
    DASHBOARD: '/',
    CLIENT: '/client',
    CLIENT_DETAILS: `/client/${PLACEHOLDER_ID}`,
    ACTIVE_LIST: '/activeList',
    SUSPEND_LIST: '/suspendList',
    TRAINER: '/trainer',
    TRAINER_DETAILS: `/trainer/${PLACEHOLDER_ID}`,
    GYMS: '/gyms',
}

export default AppRoute
