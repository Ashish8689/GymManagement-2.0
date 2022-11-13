import React, { FC, useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import { DashboardStatsType } from '../component/dashboard/dashboard.interface'
import { DASHBOARD_STATUS_CARDS } from '../constants/dashboard.constant'
import DashboardClientTable from '../component/dashboard/DashboardClientTable'
import message from '../component/CustomMessage'
import StatusCard from '../component/StatusCard/StatusCard'
import { StatusCardDetails } from '../component/StatusCard/StatusCard.interface'
import { getDashboardStats } from '../component/rest/stats.rest'

const Home: FC = () => {
    const [dashboardStats, setDashboardStats] = useState<StatusCardDetails[]>()

    const fetchStats = async (): Promise<void> => {
        try {
            const response = await getDashboardStats()
            const data = DASHBOARD_STATUS_CARDS.map((data) => {
                return {
                    ...data,
                    value: response[data.keys as DashboardStatsType] ?? 0,
                }
            })
            setDashboardStats(data)
        } catch (err) {
            message.error(err as AxiosError)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    return (
        <div className="dashboard-container p-4">
            <div className="grid grid-cols-4 gap-5">
                {dashboardStats?.map((content) => (
                    <StatusCard key={content.keys} {...content} />
                ))}
            </div>

            <div className="dashboard-table pt-12">
                <div className="flex items-center pb-3">
                    <h1 className="font-semibold">Membership Ending</h1>
                    <Popover
                        className="pl-2"
                        content="Client Membership ending within 7 days "
                    >
                        <InfoCircleOutlined />
                    </Popover>
                </div>

                <DashboardClientTable />
            </div>
        </div>
    )
}

export default Home
