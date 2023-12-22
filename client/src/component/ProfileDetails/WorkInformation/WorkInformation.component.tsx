import { Col, Form, FormInstance, Input, Row, Select } from 'antd'
import { AxiosError } from 'axios'
import message from 'component/CustomMessage/CustomMessage'
import { getStaffDepartmentListAPI } from 'component/rest/Staff/staffDepartment.rest'
import { VALIDATION_MESSAGES } from 'constants/common.constant'
import { StaffDepartment } from 'pages/Staff/Staff.interface'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const WorkInformation = ({ form }: { form: FormInstance }) => {
    const { t } = useTranslation()

    const [departmentState, setDepartmentState] = useState<{
        data: StaffDepartment[]
        isLoading: boolean
    }>({
        data: [],
        isLoading: false,
    })

    const fetchDepartment = async () => {
        if (departmentState.data.length > 0) {
            return
        }
        setDepartmentState((prev) => ({ ...prev, isLoading: true }))
        try {
            const data = await getStaffDepartmentListAPI()
            setDepartmentState((prev) => ({ ...prev, data }))
        } catch (error) {
            message.error(error as AxiosError)
        } finally {
            setDepartmentState((prev) => ({ ...prev, isLoading: false }))
        }
    }

    const departmentOptions = useMemo(
        () =>
            departmentState.data.map((item) => ({
                label: item.department,
                value: item._id,
            })),
        [departmentState.data]
    )

    return (
        <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            validateMessages={VALIDATION_MESSAGES}>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        label={t('label.department')}
                        name="department"
                        rules={[{ required: true }]}>
                        <Select
                            loading={departmentState.isLoading}
                            options={departmentOptions}
                            onFocus={fetchDepartment}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={t('label.source-of-hiring')}
                        name="sourceOfHire"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default WorkInformation
