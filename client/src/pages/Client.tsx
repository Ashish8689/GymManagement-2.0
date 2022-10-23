import React, { FC } from 'react'
import { Button, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { SelectOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

import { ClientData } from '../types/types'
import {
    CLIENT_ACTIONS,
    CLIENT_DATA,
    CLIENT_MODAL_DATA,
} from '../constants/clients.constant'
import ActionMenu from '../component/ActionMenu/ActionMenu'
import ClientModal from '../component/componentModal/client/ClientModal'
import ClientSubscribeModal from '../component/componentModal/client/ClientSubscribeModal'
import ModalUtil from '../component/ModalUtil'

const Client: FC = () => {
    const navigate = useNavigate()

    const addClientModal = (): void => {
        return ModalUtil.show({
            content: (
                <ClientModal
                    actionType={CLIENT_MODAL_DATA.actionType}
                    formData={CLIENT_MODAL_DATA.formData}
                    onClose={() => console.log('client add modal is close')}
                />
            ),
        })
    }

    const editClientModal = (record: ClientData): void => {
        ModalUtil.show({
            content: (
                <ClientModal
                    actionType={CLIENT_ACTIONS.EDIT}
                    formData={record}
                    onClose={() => console.log('client edit modal is close')}
                />
            ),
        })
    }

    const subscribeClientModal = (record: ClientData): void => {
        ModalUtil.show({
            content: (
                <ClientSubscribeModal
                    actionType={CLIENT_ACTIONS.SUBSCRIBE}
                    formData={record}
                    onClose={() =>
                        console.log('client subscribe modal is close')
                    }
                />
            ),
        })
    }

    const onClick = (name: string, data: ClientData): void => {
        switch (name) {
            case 'edit':
                editClientModal(data)

                break
            case 'subscribe':
                subscribeClientModal(data)

                break
            default:
                break
        }
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
            title: 'Action',
            key: 'action',
            width: 100,
            dataIndex: 'id',
            align: 'center',
            render: (_, record) => {
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
            <div className="add-clients p-5 text-right">
                <Button type="primary" onClick={addClientModal}>
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
