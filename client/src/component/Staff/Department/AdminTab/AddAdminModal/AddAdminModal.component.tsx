import { Space } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { AxiosError } from 'axios'
import BaseModal from 'component/BaseModal/BaseModal'
import message from 'component/CustomMessage/CustomMessage'
import { updateStaffRoleAPI } from 'component/rest/Staff/staff.rest'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StaffCheckboxItem from '../StaffCheckboxItem/StaffCheckboxItem.component'
import { AddAdminModalProps } from './AddAdminModal.interface'

const AddAdminModal: React.FC<AddAdminModalProps> = ({
    staff,
    getDepartmentByName,
    onSuccess,
}) => {
    const { t } = useTranslation()
    const [checkedList, setCheckedList] = useState<Record<string, boolean>>({})

    const handleSubmit = async (): Promise<void> => {
        try {
            const ids = Object.keys(checkedList).filter(
                (key) => checkedList[key]
            )

            await updateStaffRoleAPI(ids)

            onSuccess()
        } catch (error) {
            message.error(error as AxiosError)
        }
    }

    const modalProps = {
        title: t('label.action-entity', {
            entity: t('label.admin'),
            action: t('label.add'),
        }),
        onOk: handleSubmit,
    }

    const handleStaffCheckboxChange = useCallback(
        (e: CheckboxChangeEvent, id: string) => {
            setCheckedList((prevState) => ({
                ...prevState,
                [id]: e.target.checked,
            }))
        },
        [setCheckedList]
    )

    return (
        <BaseModal modalProps={modalProps}>
            <Space direction="vertical">
                {staff.map((item) => (
                    <StaffCheckboxItem
                        getDepartmentByName={getDepartmentByName}
                        key={item._id}
                        staff={item}
                        onChange={handleStaffCheckboxChange}
                    />
                ))}
            </Space>
        </BaseModal>
    )
}

export default AddAdminModal
