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
    deleteStaffDepartmentAPI,
    getStaffDepartmentListAPI,
} from 'component/rest/Staff/staffDepartment.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'constants/common.constant'
import { StaffDepartment } from 'pages/Staff/Staff.interface'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddDepartmentModal from '../AddDepartmentModal/AddDepartmentModal.component'
import { DepartmentStateProps } from './DepartmentTab.interface'

const DepartmentTab = () => {
    const { t } = useTranslation()

    const [departmentData, setDepartmentData] = useState<DepartmentStateProps>({
        data: [],
        isLoading: true,
    })

    const fetchDepartments = useCallback(async (): Promise<void> => {
        setDepartmentData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getStaffDepartmentListAPI()
            setDepartmentData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setDepartmentData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [setDepartmentData])

    const deleteDepartment = async (id: string) => {
        try {
            await deleteStaffDepartmentAPI(id)
            fetchDepartments()
        } catch (error) {
            message.error(error as AxiosError)
        }
    }

    const addDepartmentModal = () => {
        ModalUtil.show({
            content: (
                <AddDepartmentModal
                    actionType={ACTION_TYPE.ADD}
                    onSuccess={() => fetchDepartments()}
                />
            ),
        })
    }

    const editDepartmentModal = (data: StaffDepartment) => {
        ModalUtil.show({
            content: (
                <AddDepartmentModal
                    actionType={ACTION_TYPE.EDIT}
                    initialValues={data}
                    onSuccess={() => fetchDepartments()}
                />
            ),
        })
    }

    const onClick = (type: ACTION_TYPE, data: StaffDepartment): void => {
        if (type === ACTION_TYPE.EDIT) {
            editDepartmentModal(data)
        }
    }

    const columns = useMemo(() => {
        const data: ColumnsType<StaffDepartment> = [
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
                            entity={ENTITY_TYPE.DEPARTMENT}
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
        fetchDepartments()
    }, [])

    return (
        <Row className="m-t-md" gutter={[20, 20]}>
            <Col span={24}>
                <Space align="start" className="w-full justify-between">
                    <Typography.Text className="title">
                        {t('label.department')}
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
                                onClick={addDepartmentModal}>
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
                                onClick={addDepartmentModal}>
                                {t('label.import')}
                            </Button>
                        </Tooltip>

                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={addDepartmentModal}>
                            {t('label.add-entity', {
                                entity: t('label.department'),
                            })}
                        </Button>
                    </Space>
                </Space>
            </Col>

            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={departmentData.data}
                    loading={departmentData.isLoading}
                    rowKey="_id"
                />
            </Col>
        </Row>
    )
}

export default DepartmentTab
