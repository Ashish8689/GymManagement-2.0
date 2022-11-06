import { SelectOutlined } from '@ant-design/icons'
import { Spin, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    ClientData,
    ClientDataDashboard,
} from '../../interface/client.interface'
import message from '../CustomMessage'
import { getClients } from '../rest/client.rest'
import { getFormattedDate } from '../utils/date.utils'
import { CellRenderers } from '../utils/tableUtils'

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
            title: 'Client Code',
            dataIndex: 'clientCode',
            key: 'clientCode',
            width: 70,
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
            width: 100,
            ellipsis: true,
            fixed: 'left',
        },
        {
            title: 'Membership Ending',
            dataIndex: 'membershipEnding',
            key: 'membershipEnding',
            width: 100,
            ellipsis: true,
            render: (value) =>
                value
                    ? getFormattedDate(value)
                    : CellRenderers.VALUE_OR_NA(value),
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 100,
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
    ]

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <Spin size="large" spinning={isLoading}>
            <Table
                columns={CLIENT_COLUMN}
                dataSource={data}
                scroll={{
                    x: 1000,
                }}
            />
        </Spin>
    )
}

export default DashboardClientTable
