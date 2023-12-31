import { Staff } from 'pages/Staff/Staff.interface'

export interface AddAdminModalProps {
    staff: Staff[]
    getDepartmentByName: (name: string) => string
    onSuccess: () => void
}
