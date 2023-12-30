import { PlusOutlined } from '@ant-design/icons'
import { useStaffProvider } from 'Provider/StaffProvider'
import { Button, Col, Row, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import ModalUtil from 'component/ModalUtil'
import AddStaffModal from 'component/Staff/StaffTab/AddStaffModal/AddStaffModal.component'
import { updateStaffAPI } from 'component/rest/Staff/staff.rest'
import { getFormattedDate } from 'component/utils/date.utils'
import { getStaffProfileUrl } from 'component/utils/staff.utils'
import { CellRenderers } from 'component/utils/tableUtils'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'enums/common.enums'
import { isEmpty } from 'lodash'
import { Staff } from 'pages/Staff/Staff.interface'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const AdminTab = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { staffData, adminStaff, handleStaffUpdate } = useStaffProvider()

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
                    throw new Error(
                        t('message.entity-not-found', {
                            entity: t('label.staff'),
                        })
                    )
                }

                await updateStaffAPI(id, {
                    ...staffData,
                    isAdmin: false,
                })

                handleStaffUpdate('data', adminMutatedData)

                message.success(
                    t('message.entity-action-successfully', {
                        entity: t('label.staff'),
                        action: t('label.deleted'),
                    })
                )
            } catch (error) {
                message.error(error as AxiosError)
            } finally {
                handleStaffUpdate('isLoading', false)
            }
        },
        [handleStaffUpdate]
    )

    const addAdminModal = useCallback(() => {
        ModalUtil.show({
            content: (
                <AddStaffModal
                    actionType={ACTION_TYPE.ADD}
                    onSuccess={() => console.log('success')}
                />
            ),
        })
    }, [])

    const editAdminModal = useCallback((data: Staff) => {
        ModalUtil.show({
            content: (
                <AddStaffModal
                    actionType={ACTION_TYPE.EDIT}
                    initialValues={data}
                    onSuccess={() => console.log('success')}
                />
            ),
        })
    }, [])

    const onClick = (type: ACTION_TYPE, data: Staff): void => {
        if (type === ACTION_TYPE.EDIT) {
            editAdminModal(data)
        }
    }

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
                // render: getDepartmentName,
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
                            actionType: ACTION_TYPE.EDIT,
                        },
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
                            onClick={(type: ACTION_TYPE) =>
                                onClick(type, record)
                            }
                        />
                    )
                },
            },
        ]

        return data
    }, [onClick, removeStaffFromAdmin])

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
