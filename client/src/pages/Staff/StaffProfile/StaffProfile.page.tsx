import { Spin } from 'antd'
import { AxiosError } from 'axios'
import message from 'component/CustomMessage/CustomMessage'
import { getStaffByEmployeeCodeAPI } from 'component/rest/Staff/staff.rest'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { StaffProfileState } from '../Staff.interface'

const StaffProfile = () => {
    const { employeeId } = useParams()

    const { t } = useTranslation()
    const [staffDetails, setStaffDetails] = useState<StaffProfileState>({
        data: undefined,
        isError: false,
        isLoading: true,
    })

    const fetchStaffDetails = useCallback(async () => {
        if (employeeId) {
            try {
                const res = await getStaffByEmployeeCodeAPI(employeeId)
                setStaffDetails((prev) => ({ ...prev, data: res }))
            } catch (error) {
                setStaffDetails((prev) => ({ ...prev, isError: false }))
                message.error(error as AxiosError)
            } finally {
                setStaffDetails((prev) => ({ ...prev, isLoading: false }))
            }
        }
    }, [employeeId])

    useEffect(() => {
        fetchStaffDetails()
    }, [])

    if (staffDetails.isLoading) {
        return (
            <div className="app-loading">
                <Spin size="large" />
            </div>
        )
    }

    if (staffDetails.isError) {
        return <h1>{t('label.staff')}</h1>
    }

    return <div>{t('label.staff')}</div>
}

export default StaffProfile
