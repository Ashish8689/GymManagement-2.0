import { AxiosError } from 'axios'
import { AuthProviderProps } from 'component/AuthProvider/AuthProvider.interface'
import message from 'component/CustomMessage/CustomMessage'
import { DepartmentStateProps } from 'component/Staff/Department/DepartmentTab/DepartmentTab.interface'
import { getStaffDepartmentListAPI } from 'component/rest/Staff/staffDepartment.rest'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

interface DepartmentProviderContextProps {
    departmentData: DepartmentStateProps
    fetchDepartments: () => Promise<void>
    getDepartmentByName: (value: string) => string
}
const DepartmentProviderContext = createContext<DepartmentProviderContextProps>(
    {} as DepartmentProviderContextProps
)

export const DepartmentProvider: React.FC<AuthProviderProps> = ({
    children,
}) => {
    const [departmentData, setDepartmentData] = useState<DepartmentStateProps>({
        data: [],
        isLoading: true,
    })

    const fetchDepartments = useCallback(async (): Promise<void> => {
        setDepartmentData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getStaffDepartmentListAPI()
            setDepartmentData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setDepartmentData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [setDepartmentData])

    const getDepartmentByName = (value: string): string =>
        departmentData.data.find((item) => item._id === value)?.department ?? ''

    const departmentProviderData = useMemo(() => {
        return {
            departmentData,
            fetchDepartments,
            getDepartmentByName,
        }
    }, [departmentData, fetchDepartments, getDepartmentByName])

    useEffect(() => {
        fetchDepartments()
    }, [])

    return (
        <DepartmentProviderContext.Provider value={departmentProviderData}>
            {children}
        </DepartmentProviderContext.Provider>
    )
}

export const useDepartmentProvider = (): DepartmentProviderContextProps =>
    useContext(DepartmentProviderContext)
