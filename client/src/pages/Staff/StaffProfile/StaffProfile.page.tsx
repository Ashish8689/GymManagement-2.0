import { Col, Row, Spin } from 'antd'
import { AxiosError } from 'axios'
import CategoryCard from 'component/CategoryCard/CategoryCard.component'
import message from 'component/CustomMessage/CustomMessage'
import { getStaffByEmployeeCodeAPI } from 'component/rest/Staff/staff.rest'
import { getStaffDetailsByCategory } from 'component/utils/staff.utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
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

    const staffDetailsByCategory = useMemo(() => {
        return staffDetails.data
            ? getStaffDetailsByCategory(staffDetails.data)
            : []
    }, [staffDetails.data])

    const fetchStaffDetails = useCallback(async () => {
        if (employeeId) {
            try {
                const res = await getStaffByEmployeeCodeAPI(employeeId)
                console.log(res)

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

    return (
        <Row gutter={[20, 20]}>
            {staffDetailsByCategory.map((categoryData) => {
                return (
                    <Col key={categoryData.category} span={12}>
                        <CategoryCard data={categoryData} />
                    </Col>
                )
            })}
        </Row>
    )
}

export default StaffProfile
