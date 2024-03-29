import {
    DownloadOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import {
    Button,
    Col,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Tooltip,
    Typography,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import ModalUtil from 'component/ModalUtil'
import { deleteStaffAPI } from 'component/rest/Staff/staff.rest'
import { getFormattedDate } from 'component/utils/date.utils'
import { getStaffProfileUrl } from 'component/utils/staff.utils'
import { CellRenderers } from 'component/utils/tableUtils'
import { ACTION_TYPE } from 'constants/action.constants'
import { STATUS_TYPE_OPTIONS } from 'constants/common.constant'
import { ENTITY_TYPE, Status } from 'enums/common.enums'
import { capitalize } from 'lodash'
import { Staff } from 'pages/Staff/Staff.interface'
import { useDepartmentProvider } from 'provider/DepartmentProvider'
import { useStaffProvider } from 'provider/StaffProvider'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AddStaffModal from './AddStaffModal/AddStaffModal.component'

const StaffTab = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { staffData, status, fetchStaff, handleStatusChange } =
        useStaffProvider()

    const { getDepartmentByName } = useDepartmentProvider()

    const deleteStaff = async (id: string) => {
        try {
            await deleteStaffAPI(id)
            fetchStaff()
        } catch (error) {
            message.error(error as AxiosError)
        }
    }

    const addStaffModal = () => {
        ModalUtil.show({
            content: (
                <AddStaffModal
                    actionType={ACTION_TYPE.ADD}
                    onSuccess={() => fetchStaff()}
                />
            ),
        })
    }

    const editStaffModal = (data: Staff) => {
        ModalUtil.show({
            content: (
                <AddStaffModal
                    actionType={ACTION_TYPE.EDIT}
                    initialValues={data}
                    onSuccess={() => fetchStaff()}
                />
            ),
        })
    }

    const onClick = (type: ACTION_TYPE, data: Staff): void => {
        if (type === ACTION_TYPE.EDIT) {
            editStaffModal(data)
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
                title: t('label.gender'),
                dataIndex: 'gender',
                key: 'gender',
                width: 200,
                render: (value) => capitalize(value),
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
                title: t('label.mobile'),
                dataIndex: 'mobile',
                key: 'mobile',
                width: 200,
            },
            {
                title: t('label.address'),
                dataIndex: 'address',
                key: 'address',
                width: 200,
            },
            {
                title: t('label.date-of-birth'),
                dataIndex: 'dateOfBirth',
                key: 'dateOfBirth',
                width: 150,
                render: getFormattedDate,
            },
            {
                title: t('label.marital-status'),
                dataIndex: 'maritalStatus',
                key: 'maritalStatus',
                width: 150,
                render: (value) => capitalize(value),
            },
            {
                title: t('label.date-of-joining'),
                dataIndex: 'dateOfJoining',
                key: 'dateOfJoining',
                width: 150,
                render: getFormattedDate,
            },
            {
                title: t('label.source-of-hiring'),
                dataIndex: 'sourceOfHire',
                key: 'sourceOfHire',
                width: 150,
            },
            {
                title: 'Status',
                dataIndex: 'isActive',
                key: 'isActive',
                width: 100,
                ellipsis: true,
                render: (value: boolean) => {
                    const color = value ? 'success' : 'error'

                    return (
                        <Tag
                            className={`mr-0 ${value && 'px-[13px]'}`}
                            color={color}>
                            {(value
                                ? Status.ACTIVE
                                : Status.IN_ACTIVE
                            ).toUpperCase()}
                        </Tag>
                    )
                },
            },
            {
                title: t('label.added-by'),
                dataIndex: 'addedBy',
                key: 'addedBy',
                width: 150,
            },
            {
                title: t('label.updated-by'),
                dataIndex: 'updatedBy',
                key: 'updatedBy',
                width: 150,
            },
            {
                title: t('label.created-at'),
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: 150,
                render: getFormattedDate,
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
                            api: deleteStaff,
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
    }, [onClick, deleteStaff])

    return (
        <Row className="m-t-md" gutter={[20, 20]}>
            <Col span={24}>
                <Space align="start" className="w-full justify-between">
                    <Select
                        options={STATUS_TYPE_OPTIONS}
                        style={{ width: 100 }}
                        value={status}
                        onChange={handleStatusChange}
                    />
                    <Space size={10}>
                        <Tooltip
                            title={t('message.export-entity', {
                                entity: t('label.client'),
                            })}>
                            <Button
                                disabled
                                icon={<UploadOutlined />}
                                type="primary"
                                onClick={addStaffModal}>
                                {t('label.export')}
                            </Button>
                        </Tooltip>

                        <Tooltip
                            title={t('message.import-entity', {
                                entity: t('label.client'),
                            })}>
                            <Button
                                disabled
                                icon={<DownloadOutlined />}
                                type="primary"
                                onClick={addStaffModal}>
                                {t('label.import')}
                            </Button>
                        </Tooltip>

                        <Button
                            disabled={status === Status.IN_ACTIVE}
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={addStaffModal}>
                            {t('label.add-entity', {
                                entity: t('label.staff'),
                            })}
                        </Button>
                    </Space>
                </Space>
            </Col>

            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={staffData.data}
                    loading={staffData.isLoading}
                    rowKey="_id"
                    scroll={{
                        x: 1800,
                    }}
                />
            </Col>
        </Row>
    )
}

export default StaffTab
