import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Spin, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { SelectOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

import {
    CLIENT_ACTIONS,
    CLIENT_MODAL_DATA,
    CLIENT_STATUS_CARDS,
} from '../constants/clients.constant'
import ActionMenu from '../component/ActionMenu/ActionMenu'
import ClientModal from '../component/componentModal/client/ClientModal'
import ClientSubscribeModal from '../component/componentModal/client/ClientSubscribeModal'
import ModalUtil from '../component/ModalUtil'
import { deactivateClient, getClients } from '../component/rest/client.rest'
import message from '../component/CustomMessage/CustomMessage'
import { AxiosError } from 'axios'
import { ClientData, ClientStatsType } from '../interface/client.interface'
import { CellRenderers } from '../component/utils/tableUtils'
import { getFormattedDate } from '../component/utils/date.utils'
import { getClientStats } from '../component/rest/stats.rest'
import { StatusCardDetails } from '../component/StatusCard/StatusCard.interface'
import StatusCard from '../component/StatusCard/StatusCard'

const Client: FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<ClientData[]>()
    const [clientStats, setClientStats] = useState<StatusCardDetails[]>()

    const fetchClientsStats = useCallback(async (): Promise<void> => {
        try {
            const response = await getClientStats()

            const data = CLIENT_STATUS_CARDS.map((data) => {
                return {
                    ...data,
                    value: response[data.keys as ClientStatsType],
                }
            })
            setClientStats(data)
        } catch (err) {
            message.error(err as AxiosError)
        }
    }, [])

    const fetchClients = useCallback(async (): Promise<void> => {
        try {
            const res = await getClients()
            setData(res)
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const afterCloseFetch = (): Promise<void> => fetchClients()

    const addClientModal = (): void => {
        return ModalUtil.show({
            content: (
                <ClientModal
                    actionType={CLIENT_MODAL_DATA.actionType}
                    formData={CLIENT_MODAL_DATA.formData}
                    onClose={() => console.log('client add modal is close')}
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

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

    const deactivateClientApi = async (id: string): Promise<void> => {
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

    const CLIENT_COLUMN: ColumnsType<ClientData> = [
        {
            title: 'Client Code',
            dataIndex: 'clientCode',
            key: 'clientCode',
            width: 150,
            ellipsis: true,
            fixed: 'left',
            render: (value) => (
                <Typography.Link
                    className="text-primary-light"
                    onClick={() => navigate(`/client/${value}`)}
                >
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
            render: CellRenderers.VALUE_OR_NA,
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
            render: (value) => getFormattedDate(value),
        },
        {
            title: 'Membership',
            dataIndex: 'membership',
            key: 'membership',
            width: 120,

            ellipsis: true,
            render: CellRenderers.VALUE_OR_NA,
        },
        {
            title: 'Membership Ending',
            dataIndex: 'membershipEnding',
            key: 'membershipEnding',
            width: 180,
            ellipsis: true,
            render: (value) =>
                value
                    ? getFormattedDate(value)
                    : CellRenderers.VALUE_OR_NA(value),
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
                        color={color}
                    >
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
                    { type: 'edit', actionType: CLIENT_ACTIONS.EDIT },
                    ...(record.isActive
                        ? [
                              {
                                  type: 'deactivate',
                                  actionType: CLIENT_ACTIONS.DEACTIVATE,
                                  api: deactivateClientApi,
                              },
                          ]
                        : []),
                    { type: 'subscribe', actionType: CLIENT_ACTIONS.SUBSCRIBE },
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
        fetchClients()
        fetchClientsStats()
    }, [fetchClients, fetchClientsStats])

    return (
        <div className="p-5">
            <div className="grid grid-cols-4 gap-5">
                {clientStats?.map((content) => (
                    <StatusCard key={content.keys} {...content} />
                ))}
            </div>

            <div className="add-clients p-5 text-right">
                <Button type="primary" onClick={addClientModal}>
                    Add Clients
                </Button>
            </div>

            <Spin size="large" spinning={isLoading}>
                <Table
                    columns={CLIENT_COLUMN}
                    dataSource={data}
                    scroll={{
                        x: 1500,
                    }}
                />
            </Spin>
        </div>
    )
}

export default Client
