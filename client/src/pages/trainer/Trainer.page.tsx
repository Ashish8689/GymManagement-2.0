import { Button, Col, Row, Spin, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { SelectOutlined } from '@ant-design/icons'
import { AxiosError } from 'axios'
import Table from 'component/Table/Table.component'
import { useTranslation } from 'react-i18next'
import ActionMenu from '../../component/ActionMenu/ActionMenu'
import message from '../../component/CustomMessage/CustomMessage'
import ModalUtil from '../../component/ModalUtil'
import TrainerModal from '../../component/componentModal/trainer/TrainerModal'
import {
    deactivateTrainer,
    getTrainers,
} from '../../component/rest/trainer.rest'
import { getFormattedDate } from '../../component/utils/date.utils'
import { CellRenderers } from '../../component/utils/tableUtils'
import {
    TRAINER_ACTIONS,
    TRAINER_MODAL_DATA,
} from '../../constants/trainer.constant'
import { TrainerData } from '../../interface/trainer.interface'

const Trainers: FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<TrainerData[]>()

    const fetchTrainers = async (): Promise<void> => {
        try {
            const res = await getTrainers()
            setData(res)
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    const afterCloseFetch = (): Promise<void> => fetchTrainers()

    const addTrainerModal = (): void => {
        return ModalUtil.show({
            content: (
                <TrainerModal
                    actionType={TRAINER_ACTIONS.ADD}
                    formData={TRAINER_MODAL_DATA.formData}
                    onClose={() => console.log('Trainer add modal is close')}
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

    const editTrainerModal = (record: TrainerData): void => {
        ModalUtil.show({
            content: (
                <TrainerModal
                    actionType={TRAINER_ACTIONS.EDIT}
                    formData={record}
                    onClose={() => console.log('Trainer edit modal is close')}
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

    const onClick = (name: string, data: TrainerData): void => {
        switch (name) {
            case 'edit':
                editTrainerModal(data)

                break
            case 'deactivate':
                console.log('deactivate')

                break
            default:
                break
        }
    }

    const deactivateTrainerApi = async (id: string): Promise<void> => {
        try {
            await deactivateTrainer(id)
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const columns: ColumnsType<TrainerData> = [
        {
            title: 'Trainer Code',
            dataIndex: 'trainerCode',
            key: 'trainerCode',
            width: 150,
            ellipsis: true,
            fixed: 'left',
            render: (value) => (
                <Typography.Link
                    className="text-primary-light"
                    onClick={() => navigate(`/trainer/${value}`)}>
                    {value} <SelectOutlined />
                </Typography.Link>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            ellipsis: true,
            fixed: 'left',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100,
            ellipsis: true,
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
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250,
            ellipsis: true,
            render: CellRenderers.VALUE_OR_NA,
        },
        {
            title: 'Joining Date',
            dataIndex: 'dateOfJoining',
            key: 'dateOfJoining',
            width: 150,
            ellipsis: true,
            render: getFormattedDate,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 150,
            ellipsis: true,
            align: 'center',
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
            align: 'center',
            ellipsis: true,
            render: CellRenderers.VALUE_OR_NA,
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            dataIndex: 'id',
            align: 'center',
            render: (_, record) => {
                const items = [
                    { type: 'edit', actionType: TRAINER_ACTIONS.EDIT },
                    {
                        type: 'deactivate',
                        actionType: TRAINER_ACTIONS.DEACTIVATE,
                        api: deactivateTrainerApi,
                    },
                ]

                return (
                    <ActionMenu
                        afterClose={afterCloseFetch}
                        data={record}
                        items={items}
                        onClick={onClick}
                    />
                )
            },
        },
    ]

    useEffect(() => {
        fetchTrainers()
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col className="text-right" span={24}>
                <Button type="primary" onClick={addTrainerModal}>
                    {t('label.add-entity', {
                        entity: t('label.trainer'),
                    })}
                </Button>
            </Col>
            <Col span={24}>
                <Spin size="large" spinning={isLoading}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={data}
                        rowKey="trainerCode"
                        scroll={{
                            x: 1500,
                        }}
                    />
                </Spin>
            </Col>
        </Row>
    )
}

export default Trainers