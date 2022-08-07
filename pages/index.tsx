import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import { DASHBOARD_STATUS_CARDS } from '../constants/dashboard.constant'
import DashboardStatusItem from '../component/dashboard/DashboardStatusItem'

const Home: NextPage = () => {
    return (
        <div className="bg-body">
            <Head>
                <title>Gym Management</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <div className="dashboard-container">
                <div className="grid grid-cols-4 gap-5">
                    {DASHBOARD_STATUS_CARDS.map((content, index) => (
                        <DashboardStatusItem key={index} {...content} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
