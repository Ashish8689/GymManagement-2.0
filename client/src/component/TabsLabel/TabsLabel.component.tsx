import { Space } from 'antd'
import { getCountBadge } from 'component/utils/common.utils'
import { isNil } from 'lodash'
import { TabsLabelProps } from './TabsLabel.interface'

const TabsLabel = ({ name, count, isActive, id }: TabsLabelProps) => {
    return (
        <Space className="w-full" data-testid={id}>
            {name}
            {!isNil(count) && (
                <span data-testid="count">
                    {getCountBadge(count, '', isActive)}
                </span>
            )}
        </Space>
    )
}

export default TabsLabel
