import { Spin, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientData, ClientDataDashboard } from '../../types/clientTypes'
import message from '../CustomMessage'
import { getClients } from '../rest/client.rest'

const DashboardClientTable: FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<ClientData[]>()

    const fetchClients = async (): Promise<void> => {
        try {
            const res = await getClients()
            setData(res)
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    const CLIENT_COLUMN: ColumnsType<ClientDataDashboard> = [
        {
            title: 'Client Id',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            ellipsis: true,
            fixed: 'left',
            align: 'center',
            render: (value) => (
                <Typography.Link
                    className="text-primary-light"
                    onClick={() => navigate(`/client/${value}`)}
                >
                    {value}
                </Typography.Link>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            ellipsis: true,
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Membership Ending',
            dataIndex: 'membershipEnding',
            key: 'membershipEnding',
            width: 100,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 100,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            align: 'center',
            ellipsis: true,
        },
    ]

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <Spin size="large" spinning={isLoading}>
            <Table
                columns={CLIENT_COLUMN}
                dataSource={[]}
                scroll={{
                    x: 1000,
                }}
            />
        </Spin>
    )
}

export default DashboardClientTable
