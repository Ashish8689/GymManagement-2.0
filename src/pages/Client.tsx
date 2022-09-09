import React, { FC, Suspense, useState } from 'react'
import { Button, Table, Tag, Typography } from 'antd'
import { ClientData } from '../types/types'
import {
    CLIENT_ACTIONS,
    CLIENT_DATA,
    CLIENT_MODAL_DATA,
} from '../constants/clients.constant'
import { ColumnsType } from 'antd/lib/table'
import ActionMenu from '../component/ActionMenu'
import { useNavigate } from 'react-router'
import ClientModal from '../component/componentModal/client/ClientModal'
import { LoadingOutlined, SelectOutlined } from '@ant-design/icons'
import ClientSubscribeModal from '../component/componentModal/client/ClientSubscribeModal'

const Client: FC = () => {
    const navigate = useNavigate()
    const [modalData, setModalData] = useState(CLIENT_MODAL_DATA)
    const [subscribeModalData, setSubscribeModalData] =
        useState(CLIENT_MODAL_DATA)

    const editClientData = (record: ClientData): void => {
        setModalData({
            actionType: CLIENT_ACTIONS.EDIT,
            formData: record,
            visible: true,
        })
    }

    const subscribeClient = (record: ClientData): void => {
        setSubscribeModalData({
            actionType: CLIENT_ACTIONS.SUBSCRIBE,
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
            case 'subscribe':
                subscribeClient(data)

                break
            default:
                break
        }
    }

    const onClose = (): void => {
        setModalData(CLIENT_MODAL_DATA)
    }

    const CLIENT_COLUMN: ColumnsType<ClientData> = [
        {
            title: 'Client Id',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            ellipsis: true,
            fixed: 'left',
            align: 'center',
            render: (value) => (
                <Typography.Link
                    className="text-primary-light"
                    onClick={() => navigate(`/client/${value}`)}
                >
                    {value} <SelectOutlined />
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
            title: 'Membership',
            dataIndex: 'membership',
            key: 'membership',
            width: 120,
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Membership Ending',
            dataIndex: 'membershipEnding',
            key: 'membershipEnding',
            width: 180,
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
                const items = [
                    { type: 'edit', actionType: CLIENT_ACTIONS.EDIT },
                    {
                        type: 'deactivate',
                        actionType: CLIENT_ACTIONS.DEACTIVATE,
                    },
                    { type: 'subscribe', actionType: CLIENT_ACTIONS.SUBSCRIBE },
                ]

                return (
                    <ActionMenu data={record} items={items} onClick={onClick} />
                )
            },
        },
    ]

    return (
        <div className="px-5">
            <Suspense fallback={<LoadingOutlined />}>
                {/* modal for add/edit actions */}
                <ClientModal
                    actionType={{ ...modalData.actionType }}
                    formData={{ ...modalData.formData }}
                    open={modalData.visible}
                    onClose={() => setModalData(CLIENT_MODAL_DATA)}
                />
            </Suspense>
            <Suspense fallback={<LoadingOutlined />}>
                {/* modal for add/edit actions */}
                <ClientSubscribeModal
                    actionType={{ ...subscribeModalData.actionType }}
                    formData={{ ...subscribeModalData.formData }}
                    open={subscribeModalData.visible}
                    onClose={() => setSubscribeModalData(CLIENT_MODAL_DATA)}
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
                    Add Clients
                </Button>
            </div>
            <Table
                columns={CLIENT_COLUMN}
                dataSource={CLIENT_DATA}
                scroll={{
                    x: 1500,
                }}
            />
        </div>
    )
}

export default Client
