import { InfoCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { AxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import message from '../component/CustomMessage/CustomMessage'
import StatusCard from '../component/StatusCard/StatusCard'
import { StatusCardDetails } from '../component/StatusCard/StatusCard.interface'
import DashboardClientTable from '../component/dashboard/DashboardClientTable'
import { DashboardStatsType } from '../component/dashboard/dashboard.interface'
import { getDashboardStats } from '../component/rest/stats.rest'
import { DASHBOARD_STATUS_CARDS } from '../constants/dashboard.constant'

const Home: FC = () => {
    const { t } = useTranslation()
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
                    <h1 className="font-semibold">
                        {' '}
                        {t('label.membership-ending')}{' '}
                    </h1>
                    <Popover
                        className="pl-2"
                        content="Client Membership ending within 7 days ">
                        <InfoCircleOutlined />
                    </Popover>
                </div>

                <DashboardClientTable />
            </div>
        </div>
    )
}

export default Home
