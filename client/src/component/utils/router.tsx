export const PLACEHOLDER_CODE = ':code'
export const PLACEHOLDER_ROUTE_TAB = ':tab'
export const PLACEHOLDER_EMPLOYEE_ID = ':employeeId'

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
    STAFF: '/staff',
    STAFF_WITH_TAB: `/staff/${PLACEHOLDER_ROUTE_TAB}`,
    STAFF_PROFILE: `/staff/profile/${PLACEHOLDER_EMPLOYEE_ID}`,
}

export default APP_ROUTE
