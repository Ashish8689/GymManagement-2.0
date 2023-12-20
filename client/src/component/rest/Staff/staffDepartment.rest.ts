import { AxiosResponse } from 'axios'
import { BASE_URL } from 'constants/url.constant'
import { StaffDepartment } from 'pages/Staff/Staff.interface'
import APIClient from '../index.rest'

export const addStaffDepartmentAPI = async (
    data: StaffDepartment
): Promise<AxiosResponse> => {
    const response = APIClient.post(BASE_URL.STAFF_DEPARTMENT, data)

    return response
}

export const getStaffDepartmentListAPI = async (): Promise<
    StaffDepartment[]
> => {
    const response = await APIClient.get(BASE_URL.STAFF_DEPARTMENT)

    return response.data.data
}

export const deleteStaffDepartmentAPI = async (
    id: string
): Promise<StaffDepartment> => {
    const response = await APIClient.delete(
        `${BASE_URL.STAFF_DEPARTMENT}/${id}`
    )

    return response.data
}
