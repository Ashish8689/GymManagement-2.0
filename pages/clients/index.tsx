import React, { FC, useCallback, useState } from 'react'
import { Button, Form, Input, Table, Tag, Col, Row, Typography } from 'antd'
import { ClientData } from '../../types'
import { CLIENT_DATA } from '../../constants/clients.constant'
import { ColumnsType } from 'antd/lib/table'
import BaseModal from '../../component/Modal'
import TextArea from 'antd/lib/input/TextArea'
import { useRouter } from 'next/router'

const Clients: FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [form] = Form.useForm()
    const router = useRouter()

    const columns: ColumnsType<ClientData> = [
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
                    onClick={() => router.push(`/clients/${value}`)}
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
                const color = value ? '#17b978' : '#ff304f'

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

    const _modalProps = {
        title: 'Add Client',
        onOk: _onOk,
    }

    return (
        <div className="px-5">
            <div className="add-clients p-5 text-right">
                <Button className="button" onClick={() => setOpenModal(true)}>
                    Add Clients
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={CLIENT_DATA}
                scroll={{
                    x: 1500,
                }}
            />

            {openModal && (
                <BaseModal
                    form={form}
                    modalProps={_modalProps}
                    setComponentModal={(value: boolean) => setOpenModal(value)}
                >
                    <Form
                        autoComplete="off"
                        form={form}
                        layout="vertical"
                        name="Add_Client"
                    >
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="Client Name"
                                    name="clientName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Client Name is required',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Mobile"
                                    name="mobile"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Mobile number is required',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Alternate Mobile"
                                    name="altMobile"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Address is required',
                                        },
                                    ]}
                                >
                                    <TextArea
                                        autoSize={{ minRows: 2, maxRows: 3 }}
                                        maxLength={6}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </BaseModal>
            )}
        </div>
    )
}

export default Clients
