import React, { FC, useEffect, useState } from 'react'
import { DASHBOARD_STATUS_CARDS } from '../constants/dashboard.constant'
import DashboardStatusItem from '../component/dashboard/DashboardStatusItem'
import DashboardClientTable from '../component/dashboard/DashboardClientTable'
import { getStats } from '../component/rest/stats.rest'
import message from '../component/CustomMessage'
import { AxiosError } from 'axios'
import {
    DashboardStatus,
    StatsType,
} from '../component/dashboard/dashboard.interface'

const Home: FC = () => {
    const [stats, setStats] = useState<DashboardStatus[]>()

    const fetchStats = async (): Promise<void> => {
        try {
            const response = await getStats()

            const data = DASHBOARD_STATUS_CARDS.map((data) => {
                return { ...data, value: response[data.keys as StatsType] }
            })
            setStats(data)
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
                {stats?.map((content) => (
                    <DashboardStatusItem key={content.keys} {...content} />
                ))}
            </div>

            <div className="dashboard-table bg-white pt-14">
                <DashboardClientTable />
            </div>
        </div>
    )
}

export default Home
