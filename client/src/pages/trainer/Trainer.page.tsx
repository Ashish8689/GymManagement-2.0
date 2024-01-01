import { Button, Col, Row, Space, Tag, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import {
    DownloadOutlined,
    PlusOutlined,
    SelectOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import ActionMenu from '../../component/ActionMenu/ActionMenu'
import message from '../../component/CustomMessage/CustomMessage'
import {
    deactivateTrainer,
    getTrainers,
} from '../../component/rest/trainer.rest'
import { getFormattedDate } from '../../component/utils/date.utils'
import { CellRenderers } from '../../component/utils/tableUtils'
import { TrainerData, TrainerPageData } from '../../interface/trainer.interface'

import AddClientStepper from 'component/AddPersonDetailsStepper/AddPersonDetailsStepper.component'
import ModalUtil from 'component/ModalUtil'
import Table from 'component/Table/Table.component'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'enums/common.enums'

const Trainers: FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [trainerData, setTrainerData] = useState<TrainerPageData>({
        data: [],
        isLoading: true,
    })

    const fetchTrainers = async (): Promise<void> => {
        setTrainerData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getTrainers()
            setTrainerData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setTrainerData((prev) => ({ ...prev, isLoading: false }))
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

    const onSuccess = useCallback(() => {
        fetchTrainers()
    }, [fetchTrainers])

    const addTrainerModal = useCallback(
        (): void =>
            ModalUtil.show({
                content: (
                    <AddClientStepper
                        entityType={ENTITY_TYPE.TRAINER}
                        onSuccess={onSuccess}
                    />
                ),
            }),

        [onSuccess]
    )

    const editTrainerModal = useCallback(
        (record: TrainerData): void => {
            ModalUtil.show({
                content: (
                    <AddClientStepper
                        entityType={ENTITY_TYPE.TRAINER}
                        initialValues={record}
                        onSuccess={onSuccess}
                    />
                ),
            })
        },
        [onSuccess]
    )

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

    const columns: ColumnsType<TrainerData> = useMemo(
        () => [
            {
                title: t('label.entity-code', {
                    entity: t('label.client'),
                }),
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
                title: t('label.entity-name', {
                    entity: t('label.trainer'),
                }),
                dataIndex: 'name',
                key: 'name',
                width: 200,
                ellipsis: true,
                fixed: 'left',
            },
            {
                title: t('label.date-of-birth'),
                dataIndex: 'dateOfBirth',
                key: 'dateOfBirth',
                width: 150,
                render: (value) =>
                    value
                        ? getFormattedDate(value)
                        : CellRenderers.VALUE_OR_NA(value),
            },
            {
                title: t('label.address'),
                dataIndex: 'address',
                key: 'address',
                width: 300,
            },
            {
                title: t('label.mobile'),
                dataIndex: 'mobile',
                key: 'mobile',
                width: 150,
                align: 'center',
                ellipsis: true,
            },
            {
                title: t('label.email'),
                dataIndex: 'email',
                key: 'email',
                width: 250,
                ellipsis: true,
                render: CellRenderers.VALUE_OR_NA,
            },
            {
                title: t('label.joining-date'),
                dataIndex: 'dateOfJoining',
                key: 'dateOfJoining',
                width: 150,
                ellipsis: true,
                render: getFormattedDate,
            },
            {
                title: t('label.status'),
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
                title: t('label.alt-mobile'),
                dataIndex: 'altMobile',
                key: 'altMobile',
                width: 150,
                align: 'center',
                ellipsis: true,
                render: CellRenderers.VALUE_OR_NA,
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
                            actionType: ACTION_TYPE.DE_ACTIVATE,
                            api: deactivateTrainerApi,
                        },
                    ]

                    return (
                        <ActionMenu
                            entity={ENTITY_TYPE.TRAINER}
                            id={record._id}
                            items={items}
                            onClick={(type: ACTION_TYPE) =>
                                onClick(type, record)
                            }
                        />
                    )
                },
            },
        ],
        [
            CellRenderers,
            onClick,
            getFormattedDate,
            deactivateTrainerApi,
            getFormattedDate,
        ]
    )

    useEffect(() => {
        fetchTrainers()
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col className="text-right" span={24}>
                <Space align="start" className="w-full justify-between">
                    <Typography.Text className="title">
                        {t('label.trainer')}
                    </Typography.Text>

                    <Space size={10}>
                        <Tooltip
                            title={t('message.export-entity', {
                                entity: t('label.trainer'),
                            })}>
                            <Button
                                disabled
                                icon={<UploadOutlined />}
                                type="primary"
                                onClick={addTrainerModal}>
                                {t('label.export')}
                            </Button>
                        </Tooltip>

                        <Tooltip
                            title={t('message.import-entity', {
                                entity: t('label.trainer'),
                            })}>
                            <Button
                                disabled
                                icon={<DownloadOutlined />}
                                type="primary"
                                onClick={addTrainerModal}>
                                {t('label.import')}
                            </Button>
                        </Tooltip>

                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={addTrainerModal}>
                            {t('label.add-entity', {
                                entity: t('label.trainer'),
                            })}
                        </Button>
                    </Space>
                </Space>
            </Col>
            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={trainerData.data}
                    loading={trainerData.isLoading}
                    rowKey="trainerCode"
                    scroll={{
                        x: 1500,
                    }}
                />
            </Col>
        </Row>
    )
}

export default Trainers
