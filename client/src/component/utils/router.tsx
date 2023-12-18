const PLACEHOLDER_CODE = ':code'

const APP_ROUTE = {
    LOGIN: '/login',
    HOME: '/',
    CLIENT: '/client',
    CLIENT_DETAILS: `/client/${PLACEHOLDER_CODE}`,
    ACTIVE_LIST: '/activeList',
    SUSPEND_LIST: '/suspendList',
    TRAINER: '/trainer',
    TRAINER_DETAILS: `/trainer/${PLACEHOLDER_CODE}`,
    ADD_TRAINER: `/add-trainer/`,
    GYMS: '/gyms',
    SUBSCRIPTION: '/subscription',
    GYM_EQUIPMENTS_CATEGORY: '/gymEquipmentCategory',
    GYM_EQUIPMENTS_CATEGORY_DETAILS: '/gymEquipmentCategory/:categoryName',
}

export default APP_ROUTE
