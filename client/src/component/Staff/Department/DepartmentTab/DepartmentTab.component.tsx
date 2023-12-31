import {
    DownloadOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Table, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import ModalUtil from 'component/ModalUtil'
import { deleteStaffDepartmentAPI } from 'component/rest/Staff/staffDepartment.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'enums/common.enums'
import { StaffDepartment } from 'pages/Staff/Staff.interface'
import { useDepartmentProvider } from 'provider/DepartmentProvider'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import AddDepartmentModal from '../AddDepartmentModal/AddDepartmentModal.component'

const DepartmentTab = () => {
    const { t } = useTranslation()

    const { departmentData, fetchDepartments } = useDepartmentProvider()

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

    return (
        <Row className="m-t-md" gutter={[20, 20]}>
            <Col span={24}>
                <Space align="start" className="w-full justify-end">
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
