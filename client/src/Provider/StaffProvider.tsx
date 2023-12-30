import { AxiosError } from 'axios'
import { AuthProviderProps } from 'component/AuthProvider/AuthProvider.interface'
import message from 'component/CustomMessage/CustomMessage'
import { StaffStateProps } from 'component/Staff/StaffTab/StaffTab.interface'
import { getStaffListAPI } from 'component/rest/Staff/staff.rest'
import { Status } from 'enums/common.enums'
import { Staff } from 'pages/Staff/Staff.interface'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

interface StaffProviderContextProps {
    staffData: StaffStateProps
    status: Status
    adminStaff: Staff[]
    fetchStaff: () => Promise<void>
    handleStaffUpdate: (key: string, value: Staff[] | boolean) => void
    handleStatusChange: (value: Status) => void
}

const StaffProviderContext = createContext<StaffProviderContextProps>(
    {} as StaffProviderContextProps
)

export const StaffProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [staffData, setStaffData] = useState<StaffStateProps>({
        data: [],
        isLoading: true,
    })
    const [status, setStatus] = useState<Status>(Status.ACTIVE)

    const fetchStaff = useCallback(async (): Promise<void> => {
        setStaffData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getStaffListAPI(status)
            setStaffData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setStaffData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [status, setStaffData])

    const adminStaff = useMemo(
        () => staffData.data.filter((item) => item.isAdmin),
        [staffData.data]
    )

    const handleStatusChange = useCallback(
        (value: Status) => setStatus(value),
        []
    )

    const handleStaffUpdate = useCallback(
        (key: string, value: Staff[] | boolean) => {
            setStaffData((prev) => ({
                ...prev,
                [key]: value,
            }))
        },
        [setStaffData]
    )

    const staffProviderData = useMemo(
        () => ({
            status,
            staffData,
            adminStaff,
            fetchStaff,
            handleStaffUpdate,
            handleStatusChange,
        }),
        [
            status,
            staffData,
            adminStaff,
            fetchStaff,
            handleStaffUpdate,
            handleStatusChange,
        ]
    )

    useEffect(() => {
        fetchStaff()
    }, [status])

    return (
        <StaffProviderContext.Provider value={staffProviderData}>
            {children}
        </StaffProviderContext.Provider>
    )
}

export const useStaffProvider = (): StaffProviderContextProps =>
    useContext(StaffProviderContext)
