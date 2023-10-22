import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, Popover, Row, Space, Typography } from 'antd'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import message from '../../component/CustomMessage/CustomMessage'
import StatusCard from '../../component/StatusCard/StatusCard'
import DashboardClientTable from '../../component/dashboard/DashboardClientTable'
import { DashboardStatsType } from '../../component/dashboard/dashboard.interface'
import { getDashboardStats } from '../../component/rest/stats.rest'
import { DASHBOARD_STATUS_CARDS } from '../../constants/dashboard.constant'
import { Dashboard } from './dashboard.interface'
import './dashboard.less'

const Home = () => {
    const { t } = useTranslation()
    const [dashboardData, setDashboardData] = useState<Dashboard>({
        isLoading: true,
        stats: [],
    })

    const fetchStats = async (): Promise<void> => {
        try {
            const response = await getDashboardStats()
            const data = DASHBOARD_STATUS_CARDS.map((data) => {
                return {
                    ...data,
                    value: response[data.keys as DashboardStatsType] ?? 0,
                }
            })
            setDashboardData((prev) => ({ ...prev, stats: data }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setDashboardData((prev) => ({ ...prev, isLoading: false }))
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    return (
        <div className="dashboard-container">
            <Row gutter={[20, 20]}>
                {dashboardData.stats.map((content) => (
                    <Col key={content.keys} span={6}>
                        <StatusCard
                            {...content}
                            isLoading={dashboardData.isLoading}
                        />
                    </Col>
                ))}
            </Row>

            <Space className="m-t-xlg w-full" direction="vertical" size="large">
                <Space align="center" size="middle">
                    <Typography.Title className="m-b-0" level={4}>
                        {t('label.membership-ending')}
                    </Typography.Title>
                    <Popover
                        content={t('message.client-membership-ending')}
                        placement="right">
                        <InfoCircleOutlined className="align-middle " />
                    </Popover>
                </Space>

                <DashboardClientTable />
            </Space>
        </div>
    )
}

export default Home
