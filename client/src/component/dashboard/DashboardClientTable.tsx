import { Typography } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CLIENT_DATA } from '../../constants/clients.constant'
import { ClientDataDashboard } from '../../types/clientTypes'

const DashboardClientTable: FC = () => {
    const navigate = useNavigate()

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

    return (
        <Table
            columns={CLIENT_COLUMN}
            dataSource={CLIENT_DATA}
            scroll={{
                x: 1000,
            }}
        />
    )
}

export default DashboardClientTable
