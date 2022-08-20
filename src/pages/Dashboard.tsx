import React, { FC } from 'react'
import { DASHBOARD_STATUS_CARDS } from '../constants/dashboard.constant'
import DashboardStatusItem from '../component/dashboard/DashboardStatusItem'
import DashboardClientTable from '../component/dashboard/DashboardClientTable'

const Home: FC = () => {
    return (
        <div className="bg-body">
            <div className="dashboard-container">
                <div className="grid grid-cols-4 gap-5">
                    {DASHBOARD_STATUS_CARDS.map((content, index) => (
                        <DashboardStatusItem key={index} {...content} />
                    ))}
                </div>

                <div className="dashboard-table bg-white pt-14">
                    <DashboardClientTable />
                </div>
            </div>
        </div>
    )
}

export default Home
