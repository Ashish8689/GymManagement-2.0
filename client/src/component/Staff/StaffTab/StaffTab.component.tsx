import {
    DownloadOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Table, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import ModalUtil from 'component/ModalUtil'
import {
    deleteStaffAPI,
    getStaffListAPI,
} from 'component/rest/Staff/staff.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'constants/common.constant'
import { Staff } from 'pages/Staff/Staff.interface'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddStaffModal from './AddStaffModal/AddStaffModal.component'
import { StaffStateProps } from './StaffTab.interface'

const StaffTab = () => {
    const { t } = useTranslation()

    const [staffData, setStaffData] = useState<StaffStateProps>({
        data: [],
        isLoading: true,
    })

    const fetchStaff = useCallback(async (): Promise<void> => {
        setStaffData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getStaffListAPI()
            setStaffData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setStaffData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [setStaffData])

    const deleteDepartment = async (id: string) => {
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
                title: t('label.department'),
                dataIndex: 'department',
                key: 'department',
                width: 200,
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
                            api: deleteDepartment,
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
    }, [onClick, deleteDepartment])

    useEffect(() => {
        fetchStaff()
    }, [])

    return (
        <Row className="m-t-md" gutter={[20, 20]}>
            <Col span={24}>
                <Space align="start" className="w-full justify-between">
                    <Typography.Text className="title">
                        {t('label.staff-plural')}
                    </Typography.Text>

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
                />
            </Col>
        </Row>
    )
}

export default StaffTab
