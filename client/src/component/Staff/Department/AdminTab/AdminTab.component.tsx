import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import ModalUtil from 'component/ModalUtil'
import { updateStaffAPI } from 'component/rest/Staff/staff.rest'
import { getFormattedDate } from 'component/utils/date.utils'
import { getStaffProfileUrl } from 'component/utils/staff.utils'
import { CellRenderers } from 'component/utils/tableUtils'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'enums/common.enums'
import { isEmpty } from 'lodash'
import { Staff } from 'pages/Staff/Staff.interface'
import { useDepartmentProvider } from 'provider/DepartmentProvider'
import { useStaffProvider } from 'provider/StaffProvider'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AddAdminModal from './AddAdminModal/AddAdminModal.component'

const AdminTab = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const {
        staffData,
        adminStaff,
        nonAdminStaff,
        handleStaffUpdate,
        fetchStaff,
    } = useStaffProvider()
    const { getDepartmentByName } = useDepartmentProvider()

    const removeStaffFromAdmin = useCallback(
        async (id: string): Promise<void> => {
            try {
                handleStaffUpdate('isLoading', true)

                let staffData: Staff = {} as Staff

                const adminMutatedData = adminStaff.map((item) => {
                    if (item._id === id) {
                        staffData = item

                        return {
                            ...item,
                            isAdmin: false,
                        }
                    }

                    return item
                })

                if (isEmpty(staffData)) {
                    throw t('message.entity-not-found', {
                        entity: t('label.staff'),
                    })
                }

                await updateStaffAPI(id, {
                    ...staffData,
                    isAdmin: false,
                })

                handleStaffUpdate('data', adminMutatedData)
            } catch (error) {
                console.log(error)

                throw error
            } finally {
                handleStaffUpdate('isLoading', false)
            }
        },
        [adminStaff, handleStaffUpdate]
    )

    const addAdminModal = useCallback(() => {
        ModalUtil.show({
            content: (
                <AddAdminModal
                    getDepartmentByName={getDepartmentByName}
                    staff={nonAdminStaff}
                    onSuccess={fetchStaff}
                />
            ),
        })
    }, [nonAdminStaff, fetchStaff, getDepartmentByName])

    const columns = useMemo(() => {
        const data: ColumnsType<Staff> = [
            {
                title: t('label.name'),
                dataIndex: 'name',
                key: 'name',
                width: 200,
                fixed: 'left',
                render: (value, record) => (
                    <Typography.Link
                        onClick={() =>
                            navigate(getStaffProfileUrl(record.employeeCode))
                        }>
                        {value}
                    </Typography.Link>
                ),
            },
            {
                title: t('label.department'),
                dataIndex: 'department',
                key: 'department',
                width: 200,
                render: getDepartmentByName,
            },
            {
                title: t('label.email'),
                dataIndex: 'email',
                key: 'email',
                width: 200,
                render: CellRenderers.VALUE_OR_NA,
            },
            {
                title: t('label.updated-at'),
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                width: 150,
                render: getFormattedDate,
            },
            {
                title: t('label.action'),
                key: 'action',
                width: 100,
                dataIndex: 'id',
                align: 'center',
                render: (_, record) => {
                    const items = [
                        {
                            actionType: ACTION_TYPE.DELETE,
                            api: removeStaffFromAdmin,
                        },
                    ]

                    return (
                        <ActionMenu
                            entity={ENTITY_TYPE.STAFF}
                            id={record._id}
                            items={items}
                        />
                    )
                },
            },
        ]

        return data
    }, [removeStaffFromAdmin])

    return (
        <Row className="m-t-md" gutter={[20, 20]}>
            <Col className="d-flex justify-end" span={24}>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={addAdminModal}>
                    {t('label.add-entity', {
                        entity: t('label.admin'),
                    })}
                </Button>
            </Col>

            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={adminStaff}
                    loading={staffData.isLoading}
                    rowKey="_id"
                />
            </Col>
        </Row>
    )
}

export default AdminTab
