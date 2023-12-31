import { EditOutlined } from '@ant-design/icons'
import { Avatar, Col, Row, Spin } from 'antd'
import { AxiosError } from 'axios'
import CategoryCard from 'component/CategoryCard/CategoryCard.component'
import message from 'component/CustomMessage/CustomMessage'
import ModalUtil from 'component/ModalUtil'
import AddStaffModal from 'component/Staff/StaffTab/AddStaffModal/AddStaffModal.component'
import { getStaffByEmployeeCodeAPI } from 'component/rest/Staff/staff.rest'
import { getRandomColor } from 'component/utils/common.utils'
import { getStaffDetailsByCategory } from 'component/utils/staff.utils'
import { ACTION_TYPE } from 'constants/action.constants'
import { useDepartmentProvider } from 'provider/DepartmentProvider'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { StaffProfileState } from '../Staff.interface'
import '../staff.less'

const StaffProfile = () => {
    const { employeeId } = useParams()
    const { getDepartmentByName } = useDepartmentProvider()

    const { t } = useTranslation()
    const [staffDetails, setStaffDetails] = useState<StaffProfileState>({
        data: undefined,
        isError: false,
        isLoading: true,
    })

    const staffDetailsByCategory = useMemo(
        () =>
            staffDetails.data
                ? getStaffDetailsByCategory(
                      staffDetails.data,
                      getDepartmentByName
                  )
                : [],
        [staffDetails.data]
    )

    const { color, character } = useMemo(
        () => getRandomColor(staffDetails.data?.name ?? ''),
        [staffDetails.data]
    )

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

    const editStaffModal = useCallback(() => {
        ModalUtil.show({
            content: (
                <AddStaffModal
                    actionType={ACTION_TYPE.EDIT}
                    initialValues={staffDetails.data}
                    onSuccess={() => fetchStaffDetails()}
                />
            ),
        })
    }, [staffDetails.data, fetchStaffDetails])

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
            <Col className="staff-profile-header" span={24}>
                <div className="avatar-container">
                    <Avatar
                        className="flex-center"
                        shape="circle"
                        size={120}
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                        style={{
                            backgroundColor: color,
                            verticalAlign: 'middle',
                        }}>
                        {character}
                    </Avatar>
                </div>

                <div className="edit-profile" onClick={editStaffModal}>
                    <EditOutlined />
                </div>
            </Col>
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
