import { Checkbox, Space, Typography } from 'antd'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StaffCheckboxItemProps } from './StaffCheckboxItem.interface'
import './staff-checkbox-item.style.less'

const StaffCheckboxItem: React.FC<StaffCheckboxItemProps> = ({
    staff,
    onChange,
    getDepartmentByName,
}) => {
    const { t } = useTranslation()

    console.log('item changes')

    return (
        <Space align="start" className="staff-checkbox-item">
            <Checkbox onChange={(e) => onChange(e, staff._id)} />
            <Space direction="vertical" size={2}>
                <Typography.Text className="staff-checkbox-title">
                    {staff.name}
                </Typography.Text>
                <Typography.Text className="staff-checkbox-description">
                    {t('label.department')} -{' '}
                    {getDepartmentByName(staff.department)}
                </Typography.Text>
            </Space>
        </Space>
    )
}

export default memo(StaffCheckboxItem)
