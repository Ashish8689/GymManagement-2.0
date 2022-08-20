import React, { FC, Suspense, useCallback, useState } from 'react'
import { Button, Form, Table, Tag, Typography } from 'antd'
import { ClientData, TrainerData } from '../types'
import { ColumnsType } from 'antd/lib/table'
import { TRAINER_DATA } from '../constants/trainer.constant'
import { useNavigate } from 'react-router'
import ActionMenu from '../component/ActionMenu'
import {
    CLIENT_ACTIONS,
    CLIENT_MODAL_DATA,
} from '../constants/clients.constant'
import ClientModal from '../component/componentModal/ClientModal'

const Trainers: FC = () => {
    const [modalData, setModalData] = useState(CLIENT_MODAL_DATA)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const editClientData = (record: ClientData): void => {
        setModalData({
            actionType: CLIENT_ACTIONS.EDIT,
            formData: record,
            visible: true,
        })
    }

    interface OnClick {
        name: string
        data: ClientData
    }

    const onClick = ({ name, data }: OnClick): void => {
        switch (name) {
            case 'edit':
                editClientData(data)

                break
            case 'deactivate':
                console.log('deactivate')

                break
            default:
                break
        }
    }

    const onClose = (): void => {
        setModalData(CLIENT_MODAL_DATA)
    }

    const columns: ColumnsType<TrainerData> = [
        {
            title: 'Trainer Id',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            ellipsis: true,
            fixed: 'left',
            align: 'center',
            render: (value) => (
                <Typography.Link
                    className="text-primary-light"
                    onClick={() => navigate(`/trainer/${value}`)}
                >
                    {value}
                </Typography.Link>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            ellipsis: true,
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 200,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 150,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Joining Date',
            dataIndex: 'dateOfJoining',
            key: 'dateOfJoining',
            width: 150,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            ellipsis: true,
            align: 'center',
            render: (value: boolean) => {
                const color = value ? 'success' : 'error'

                return (
                    <Tag
                        className={`mr-0 ${value && 'px-[13px]'}`}
                        color={color}
                    >
                        {(value ? 'ACTIVE' : 'INACTIVE').toUpperCase()}
                    </Tag>
                )
            },
        },
        {
            title: 'Alt Mobile',
            dataIndex: 'altMobile',
            key: 'altMobile',
            width: 150,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            dataIndex: 'id',
            align: 'center',
            render: (value, record) => {
                const items = [{ type: 'edit' }, { type: 'deactivate' }]

                return (
                    <ActionMenu data={record} items={items} onClick={onClick} />
                )
            },
        },
    ]

    const _onOk = useCallback(async () => {
        await form.validateFields()
        // try {
        //     const _response = await form.getFieldsValue()
        //     console.log(_response)
        // } catch (error) {
        //     throw error
        // }
    }, [form])

    return (
        <div className="px-5">
            <Suspense fallback="Hello Loading">
                {/* modal for add/edit actions */}
                <ClientModal
                    actionType={{ ...modalData.actionType }}
                    formData={{ ...modalData.formData }}
                    open={modalData.visible}
                    onClose={onClose}
                />
            </Suspense>
            <div className="add-clients p-5 text-right">
                <Button
                    type="primary"
                    onClick={() =>
                        setModalData({
                            ...CLIENT_MODAL_DATA,
                            visible: true,
                        })
                    }
                >
                    Add Trainer
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={TRAINER_DATA}
                scroll={{
                    x: 1500,
                }}
            />
        </div>
    )
}

export default Trainers
