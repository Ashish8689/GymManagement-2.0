import { SelectOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import ModalUtil from 'component/ModalUtil'
import Table from 'component/Table/Table.component'
import GymModal from 'component/componentModal/gym/GymModal'
import { deactivateGym, getGyms } from 'component/rest/gym.rest'
import { getFormattedDate } from 'component/utils/date.utils'
import { CellRenderers } from 'component/utils/tableUtils'
import { ACTION_TYPE } from 'constants/action.constants'
import { CLIENT_ACTIONS } from 'constants/clients.constant'
import { GYM_MODAL_DATA } from 'constants/gym.constant'
import { useTranslation } from 'react-i18next'
import { GymData, GymPageData } from './gym.interface'

const Gyms = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [gymData, setGymData] = useState<GymPageData>({
        data: [],
        isLoading: true,
    })

    const fetchGyms = async (): Promise<void> => {
        try {
            const res = await getGyms()
            setGymData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setGymData((prev) => ({ ...prev, isLoading: false }))
        }
    }

    const afterCloseFetch = (): Promise<void> => fetchGyms()

    const addGymModal = (): void => {
        return ModalUtil.show({
            content: (
                <GymModal
                    actionType={GYM_MODAL_DATA.actionType}
                    formData={GYM_MODAL_DATA.formData}
                    onClose={() => console.log('client add modal is close')}
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

    const editGymModal = (record: GymData): void => {
        ModalUtil.show({
            content: (
                <GymModal
                    actionType={CLIENT_ACTIONS.EDIT}
                    formData={record}
                    onClose={() => console.log('client edit modal is close')}
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

    const deactivateGymApi = async (id: string): Promise<void> => {
        try {
            await deactivateGym(id)
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const onClick = (name: string, data: GymData): void => {
        switch (name) {
            case 'edit':
                editGymModal(data)

                break
            default:
                break
        }
    }

    const GYM_COLUMN: ColumnsType<GymData> = [
        {
            title: 'Gym Code',
            dataIndex: 'gymCode',
            key: 'gymCode',
            width: 150,
            ellipsis: true,
            fixed: 'left',
            render: (value) => (
                <Typography.Link
                    className="text-primary-light"
                    onClick={() => navigate(`/client/${value}`)}>
                    {value} <SelectOutlined />
                </Typography.Link>
            ),
        },
        {
            title: 'Gym Name',
            dataIndex: 'gymName',
            key: 'gymName',
            width: 150,
            ellipsis: true,
            fixed: 'left',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 150,

            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            ellipsis: true,
            render: CellRenderers.VALUE_OR_NA,
        },
        {
            title: 'Joining Date',
            dataIndex: 'dateOfJoining',
            key: 'dateOfJoining',
            width: 150,
            ellipsis: true,
            render: (value) => getFormattedDate(value),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 150,
            ellipsis: true,

            render: (value: boolean) => {
                const color = value ? 'success' : 'error'

                return (
                    <Tag
                        className={`mr-0 ${value && 'px-[13px]'}`}
                        color={color}>
                        {(value ? 'ACTIVE' : 'INACTIVE').toUpperCase()}
                    </Tag>
                )
            },
        },
        {
            title: 'Alt Mobile',
            dataIndex: 'altMobile',
            key: 'altMobile',
            width: 150,

            ellipsis: true,
            render: CellRenderers.VALUE_OR_NA,
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            dataIndex: 'id',

            render: (_, record) => {
                const items = [
                    { type: ACTION_TYPE.EDIT, actionType: CLIENT_ACTIONS.EDIT },
                    ...(record.isActive
                        ? [
                              {
                                  type: ACTION_TYPE.DE_ACTIVATE,
                                  actionType: CLIENT_ACTIONS.DEACTIVATE,
                                  api: deactivateGymApi,
                              },
                          ]
                        : []),
                ]

                return (
                    <ActionMenu
                        afterClose={afterCloseFetch}
                        id={record._id}
                        items={items}
                        onClick={(type: ACTION_TYPE) => onClick(type, record)}
                    />
                )
            },
        },
    ]

    useEffect(() => {
        fetchGyms()
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col className="text-right" span={24}>
                <Button type="primary" onClick={addGymModal}>
                    {t('label.add-entity', {
                        entity: t('label.gym'),
                    })}
                </Button>
            </Col>

            <Col span={24}>
                <Table
                    columns={GYM_COLUMN}
                    dataSource={gymData.data}
                    loading={gymData.isLoading}
                    rowKey="gymCode"
                    scroll={{
                        x: 1500,
                    }}
                />
            </Col>
        </Row>
    )
}

export default Gyms
