import React, { FC } from 'react'
import { DashboardStatus } from './dashboard.interface'

const DashboardStatusItem: FC<DashboardStatus> = ({
    name,
    number,
    dotColor,
}) => {
    return (
        <div
            className={`dashboard-block relative box-border h-28 overflow-hidden rounded-lg bg-primary py-2 px-4 font-semibold shadow-[1px_1px_10px_rgba(255,255,255,.14)] ${dotColor} cursor-pointer`}
        >
            <h1 className="relative z-10 pt-1 text-left text-sm font-medium text-white duration-500">
                {name}
            </h1>
            <h2 className="text-heading relative z-10 pt-3 text-left text-3xl font-semibold text-white duration-500">
                {number}
            </h2>
        </div>
    )
}

export default DashboardStatusItem