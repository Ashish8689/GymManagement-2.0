import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { Staff } from 'pages/Staff/Staff.interface'

export interface StaffCheckboxItemProps {
    staff: Staff
    onChange: (e: CheckboxChangeEvent, id: string) => void
    getDepartmentByName: (name: string) => string
}
