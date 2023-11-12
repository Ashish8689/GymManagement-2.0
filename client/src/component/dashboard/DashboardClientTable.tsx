import { SelectOutlined } from '@ant-design/icons'
import { Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Table from 'component/Table/Table.component'
import { ClientDataDashboard } from 'pages/Client/client.interface'
import message from '../CustomMessage/CustomMessage'
import { deactivatingClients } from '../rest/client.rest'
import { getFormattedDate } from '../utils/date.utils'
import { CellRenderers } from '../utils/tableUtils'
import { DashboardTable } from './dashboard.interface'

const DashboardClientTable: FC = () => {
    const navigate = useNavigate()
    const [dashboardTableData, setDashboardTableData] =
        useState<DashboardTable>({
            isLoading: true,
            data: [],
        })

    const fetchMemberEndingClientsData = async (): Promise<void> => {
        try {
            const res = await deactivatingClients()
            setDashboardTableData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setDashboardTableData((prev) => ({ ...prev, isLoading: false }))
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
                    onClick={() => navigate(`/client/${value}`)}>
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
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 80,
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
    ]

    useEffect(() => {
        fetchMemberEndingClientsData()
    }, [])

    return (
        <Table
            bordered
            columns={CLIENT_COLUMN}
            dataSource={dashboardTableData.data}
            loading={dashboardTableData.isLoading}
            pagination={false}
            rowKey="clientCode"
            scroll={{
                x: 1000,
            }}
            size="small"
        />
    )
}

export default DashboardClientTable
