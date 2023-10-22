import { Skeleton, Typography } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { StatusCardDetails } from './StatusCard.interface'
import './status-card.less'

const StatusCard: FC<StatusCardDetails> = ({
    name,
    value,
    dotColor,
    isLoading,
}) => {
    if (isLoading) {
        return (
            <Skeleton
                active
                className="dashboard-block"
                paragraph={{ rows: 2 }}
            />
        )
    }

    return (
        <div className={classNames(dotColor, 'dashboard-block')}>
            <Typography.Text className="status-card-title">
                {name}
            </Typography.Text>
            <Typography.Text className="status-card-value">
                {value}
            </Typography.Text>
        </div>
    )
}

export default StatusCard
