import {
    DownloadOutlined,
    PlusOutlined,
    SelectOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Tag, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { AxiosError } from 'axios'
import AddClientStepper from 'component/AddPersonDetailsStepper/AddPersonDetailsStepper.component'
import Table from 'component/Table/Table.component'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'constants/add-stepper.constant'
import { useTranslation } from 'react-i18next'
import ActionMenu from '../../component/ActionMenu/ActionMenu'
import message from '../../component/CustomMessage/CustomMessage'
import ModalUtil from '../../component/ModalUtil'
import StatusCard from '../../component/StatusCard/StatusCard'
import ClientModal from '../../component/componentModal/client/ClientModal'
import ClientSubscribeModal from '../../component/componentModal/client/ClientSubscribeModal'
import { getClients } from '../../component/rest/client.rest'
import { getClientStats } from '../../component/rest/stats.rest'
import { getFormattedDate } from '../../component/utils/date.utils'
import { CellRenderers } from '../../component/utils/tableUtils'
import {
    CLIENT_ACTIONS,
    CLIENT_STATUS_CARDS,
} from '../../constants/clients.constant'
import {
    ClientData,
    ClientPageData,
    ClientPageStats,
    ClientStatsType,
} from './client.interface'

const Client = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [clientData, setClientData] = useState<ClientPageData>({
        isLoading: true,
        data: [],
    })

    const [clientStatsData, setClientStatsData] = useState<ClientPageStats>({
        isLoading: true,
        stats: [],
    })

    const [addModel, setAddModel] = useState<boolean>(false)

    const fetchClientsStats = useCallback(async (): Promise<void> => {
        setClientStatsData((prev) => ({ ...prev, isLoading: true }))
        try {
            const response = await getClientStats()

            const data = CLIENT_STATUS_CARDS.map((data) => {
                return {
                    ...data,
                    value: response[data.keys as ClientStatsType],
                }
            })
            setClientStatsData((prev) => ({ ...prev, stats: data }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setClientStatsData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [])

    const fetchClients = useCallback(async (): Promise<void> => {
        setClientData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getClients()
            setClientData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setClientData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [])

    const afterCloseFetch = (): Promise<void> => fetchClients()

    const addClientModal = (): void => setAddModel(true)

    const editClientModal = (record: ClientData): void => {
        ModalUtil.show({
            content: (
                <ClientModal
                    actionType={CLIENT_ACTIONS.EDIT}
                    formData={record}
                    onClose={() => console.log('client edit modal is close')}
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

    const subscribeClientModal = (record: ClientData): void => {
        ModalUtil.show({
            content: (
                <ClientSubscribeModal
                    actionType={CLIENT_ACTIONS.SUBSCRIBE}
                    formData={record}
                    onClose={() =>
                        console.log('client subscribe modal is close')
                    }
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

    const deactivateClient = async (id: string): Promise<void> => {
        try {
            await deactivateClient(id)
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const onClick = (name: string, data: ClientData): void => {
        switch (name) {
            case 'edit':
                editClientModal(data)

                break
            case 'subscribe':
                subscribeClientModal(data)

                break
            default:
                break
        }
    }

    const CLIENT_COLUMN: ColumnsType<ClientData> = useMemo(
        () => [
            {
                title: t('label.entity-code', {
                    entity: t('label.client'),
                }),
                dataIndex: 'clientCode',
                key: 'clientCode',
                width: 120,
                ellipsis: true,
                fixed: 'left',
                render: (value) => (
                    <Typography.Link
                        onClick={() => navigate(`/client/${value}`)}>
                        {value} <SelectOutlined />
                    </Typography.Link>
                ),
            },
            {
                title: t('label.entity-name', {
                    entity: t('label.client'),
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
                render: (value) => getFormattedDate(value),
            },
            {
                title: t('label.membership'),
                dataIndex: 'membership',
                key: 'membership',
                width: 120,
                render: CellRenderers.VALUE_OR_NA,
            },
            {
                title: t('label.membership-ending'),
                dataIndex: 'membershipEnding',
                key: 'membershipEnding',
                width: 180,
                render: (value) =>
                    value
                        ? getFormattedDate(value)
                        : CellRenderers.VALUE_OR_NA(value),
            },
            {
                title: t('label.status'),
                dataIndex: 'isActive',
                key: 'isActive',
                width: 150,
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
                            type: ACTION_TYPE.EDIT,
                            actionType: CLIENT_ACTIONS.EDIT,
                        },
                        ...(record.isActive
                            ? [
                                  {
                                      type: ACTION_TYPE.DE_ACTIVATE,
                                      actionType: CLIENT_ACTIONS.DEACTIVATE,
                                      api: deactivateClient,
                                  },
                              ]
                            : []),
                        {
                            type: ACTION_TYPE.SUBSCRIBE,
                            actionType: CLIENT_ACTIONS.SUBSCRIBE,
                        },
                    ]

                    return (
                        <ActionMenu
                            afterClose={afterCloseFetch}
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
        [getFormattedDate, afterCloseFetch, onClick, CellRenderers]
    )

    const onSuccess = () => {
        setAddModel(false)
        fetchClients()
        fetchClientsStats()
    }

    useEffect(() => {
        fetchClients()
        fetchClientsStats()
    }, [fetchClients, fetchClientsStats])

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <Row gutter={[20, 20]}>
                    {clientStatsData.stats.map((content) => (
                        <Col key={content.keys} span={6}>
                            <StatusCard
                                {...content}
                                isLoading={clientStatsData.isLoading}
                            />
                        </Col>
                    ))}
                </Row>
            </Col>

            <Col className="text-right" span={24}>
                <Space size={10}>
                    <Tooltip
                        title={t('message.export-entity', {
                            entity: t('label.client'),
                        })}>
                        <Button
                            disabled
                            icon={<UploadOutlined />}
                            type="primary"
                            onClick={addClientModal}>
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
                            onClick={addClientModal}>
                            {t('label.import')}
                        </Button>
                    </Tooltip>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={addClientModal}>
                        {t('label.add-entity', {
                            entity: t('label.client-plural'),
                        })}
                    </Button>
                </Space>
            </Col>

            <Col span={24}>
                <Table
                    bordered
                    columns={CLIENT_COLUMN}
                    dataSource={clientData.data}
                    loading={clientData.isLoading}
                    scroll={{
                        x: 1800,
                    }}
                    size="large"
                />
            </Col>

            <AddClientStepper
                closeModal={() => setAddModel(false)}
                entityType={ENTITY_TYPE.CLIENT}
                open={addModel}
                onSuccess={onSuccess}
            />
        </Row>
    )
}

export default Client
