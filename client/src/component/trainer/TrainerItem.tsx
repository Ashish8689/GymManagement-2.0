import { Col, Input, Row, Spin, Table } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import { find } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ClientSocial from '../../component/ClientSocial'
import { ClientData, ClientMembershipData } from '../../types/clientTypes'
import message from '../CustomMessage'
import { getClients } from '../rest/client.rest'

const TrainerItem: FC = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [client, setTrainer] = useState<{ [key: string]: any | ClientData }>(
        {}
    )

    const fetchClients = async (): Promise<void> => {
        try {
            const res = await getClients()
            setTrainer(find(res, ['id', Number(id)]) || {})
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    const clientHistoryColumns: ColumnsType<ClientMembershipData> = [
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            ellipsis: true,
            fixed: 'left',
        },
        {
            title: 'Months',
            dataIndex: 'membership',
            key: 'membership',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Payment Collecter',
            dataIndex: 'paymentCollector',
            key: 'paymentCollector',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: 150,
            ellipsis: true,
        },
    ]

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <Spin size="large" spinning={isLoading}>
            <div className="py-7 px-5">
                <div className="flex gap-10 ">
                    <div className="flex flex-[30%] content-center">
                        <div className="bg-input relative h-[400px] w-full max-w-md rounded-2xl p-5">
                            <div className="relative flex h-[65%] items-center justify-center">
                                <img
                                    alt={client.name}
                                    className="h-52 w-52 rounded-full"
                                    src="/images/logo.png"
                                />
                                <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-rotate rounded-full border-2 border-primary-light content-['']">
                                    <div
                                        className={`absolute top-2 left-9 h-5 w-5 rounded-full
                                bg-primary`}
                                    />
                                </div>
                            </div>
                            <div className="flex h-[35%] flex-col items-center justify-center p-3 pb-0">
                                <h1 className="pb-2 text-2xl font-bold text-white">
                                    {client.name}
                                </h1>
                                <ClientSocial
                                    email={client.email}
                                    mobile={client.mobile}
                                />
                            </div>

                            <div
                                className={` absolute top-5 right-5 h-3 w-3 rounded-full
                        ${client.status ? 'bg-active' : 'bg-deactive'}`}
                            />
                        </div>
                    </div>

                    <div className="flex-[70%]">
                        <Row className="client-detail-form" gutter={[16, 24]}>
                            <Col span={12}>
                                <label htmlFor="name">Client Name</label>
                                <Input disabled value={client.name} />
                            </Col>

                            <Col span={12}>
                                <label htmlFor="mobile">Mobile</label>
                                <Input disabled value={client.mobile} />
                            </Col>

                            <Col span={12}>
                                <label htmlFor="email">Email</label>
                                <Input disabled value={client.email} />
                            </Col>

                            <Col span={12}>
                                <label htmlFor="altMobile">
                                    Alternate Mobile
                                </label>
                                <Input disabled value={client.altMobile} />
                            </Col>

                            <Col span={24}>
                                <label htmlFor="address">Address</label>
                                <TextArea
                                    disabled
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    value={client.address}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="client-payment-history pt-10">
                    <Table
                        className="overflow-hidden rounded-xl"
                        columns={clientHistoryColumns}
                        dataSource={[]}
                        // scroll={{
                        //     x: 1500,
                        // }}
                    />
                </div>
            </div>
        </Spin>
    )
}

export default TrainerItem
