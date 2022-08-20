import React, { FC } from 'react'
import { DashboardStatus } from '../../types'

const DashboardStatusItem: FC<DashboardStatus> = ({
    name,
    number,
    dotColor,
}) => {
    return (
        <div
            className={`dashboard-block relative box-border h-28 overflow-hidden rounded-lg bg-bold py-2 px-4 font-semibold shadow-[1px_1px_10px_rgba(255,255,255,.14)] ${dotColor} cursor-pointer`}
        >
            <h1 className="relative z-10 pt-1 text-left text-sm text-para">
                {name}
            </h1>
            <h2 className="relative z-10 pt-3 text-left text-3xl text-white">
                {number}
            </h2>
        </div>
    )
}

export default DashboardStatusItem
