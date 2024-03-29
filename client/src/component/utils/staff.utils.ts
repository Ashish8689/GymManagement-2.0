import { capitalize } from 'lodash'
import { Staff, StaffCategoryData } from 'pages/Staff/Staff.interface'
import { getFormattedDate } from './date.utils'
import i18n from './i18next/LocalUtils'
import APP_ROUTE, { PLACEHOLDER_EMPLOYEE_ID } from './router'
import { CellRenderers } from './tableUtils'

export const getStaffProfileUrl = (id: string) =>
    APP_ROUTE.STAFF_PROFILE.replace(PLACEHOLDER_EMPLOYEE_ID, id)

export const getStaffDetailsByCategory = (
    data: Staff,
    getDepartmentByName: (value: string) => string
): StaffCategoryData[] => {
    return [
        {
            category: i18n.t('label.personal-detail-plural'),
            details: [
                {
                    label: i18n.t('label.name'),
                    value: data.name,
                },
                {
                    label: i18n.t('label.gender'),
                    value: capitalize(data.gender),
                },
                {
                    label: i18n.t('label.date-of-birth'),
                    value: getFormattedDate(data.dateOfBirth),
                },
                {
                    label: i18n.t('label.marital-status'),
                    value: capitalize(data.maritalStatus),
                },
            ],
        },
        {
            category: i18n.t('label.system-field-plural'),
            details: [
                {
                    label: i18n.t('label.added-by'),
                    value: data.addedBy,
                },
                {
                    label: i18n.t('label.added-time'),
                    value: getFormattedDate(data.createdAt),
                },
                {
                    label: i18n.t('label.updated-by'),
                    value: data.updatedBy,
                },
                {
                    label: i18n.t('label.updated-time'),
                    value: getFormattedDate(data.updatedAt),
                },
            ],
        },
        {
            category: i18n.t('label.work-information'),
            details: [
                {
                    label: i18n.t('label.employee-code'),
                    value: data.employeeCode,
                },
                {
                    label: i18n.t('label.department'),
                    value: getDepartmentByName(data.department),
                },
                {
                    label: i18n.t('label.date-of-joining'),
                    value: getFormattedDate(data.dateOfJoining),
                },
                {
                    label: i18n.t('label.source-of-hiring'),
                    value: data.sourceOfHire,
                },
                {
                    label: i18n.t('label.employee-status'),
                    value: data.isActive
                        ? i18n.t('label.active')
                        : i18n.t('label.in-active'),
                },
            ],
        },
        {
            category: i18n.t('label.contact-information'),
            details: [
                {
                    label: i18n.t('label.phone-number'),
                    value: data.mobile,
                },
                {
                    label: i18n.t('label.email'),
                    value: CellRenderers.VALUE_OR_NA(data.email),
                },
                {
                    label: i18n.t('label.address'),
                    value: data.address,
                },
            ],
        },
    ]
}
