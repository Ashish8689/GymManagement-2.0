import { Col, Input, Row, Spin, Table } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import ClientSocial from '../ClientSocial'
import {
    ClientData,
    ClientMembershipHistory,
} from '../../interface/client.interface'
import message from '../CustomMessage'
import { getClientByCode } from '../rest/client.rest'
import { getFormattedDate } from '../utils/date.utils'
import { CellRenderers } from '../utils/tableUtils'

const ClientItem: FC = () => {
    const { code } = useParams<string>()
    const [isLoading, setIsLoading] = useState(true)
    const [clientData, setClientData] = useState<ClientData>()

    const fetchClients = async (): Promise<void> => {
        try {
            if (code) {
                const response = await getClientByCode(code)
                setClientData(response)
            }
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    const clientHistoryColumns: ColumnsType<ClientMembershipHistory> = [
        {
            title: 'Payment Data',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            width: 100,
            ellipsis: true,
            fixed: 'left',
            render: getFormattedDate,
        },
        {
            title: 'Membership',
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
            render: (value) =>
                value
                    ? getFormattedDate(value)
                    : CellRenderers.VALUE_OR_NA(value),
        },
        {
            title: 'Payment Collector',
            dataIndex: 'paymentCollector',
            key: 'paymentCollector',
            width: 120,
            ellipsis: true,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: 120,
            ellipsis: true,
        },
        {
            title: 'TransactionId',
            dataIndex: 'transactionId',
            key: 'transactionId',
            width: 150,
            ellipsis: true,
            render: CellRenderers.VALUE_OR_NA,
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
                        <div className="relative h-[400px] w-full max-w-md rounded-2xl bg-body p-5 shadow-lg">
                            <div className="relative flex h-[65%] items-center justify-center">
                                <img
                                    alt={clientData?.name}
                                    className="h-52 w-52 rounded-full"
                                    src="/images/logo.png"
                                />
                                <div
                                    className="border-1 absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-rotate rounded-full border-solid
                                 border-bold-light content-['']"
                                >
                                    <div
                                        className={`absolute top-2 left-9 h-5 w-5 rounded-full
                                bg-primary`}
                                    />
                                </div>
                            </div>
                            <div className="flex h-[35%] flex-col items-center justify-center p-3 pb-0">
                                <h1 className="pb-2 text-2xl font-bold text-bold-light">
                                    {clientData?.name}
                                </h1>
                                <ClientSocial
                                    email={clientData?.email}
                                    mobile={clientData?.mobile}
                                />
                            </div>

                            <div
                                className={` absolute top-5 right-5 h-3 w-3 rounded-full
                        ${clientData?.isActive ? 'bg-active' : 'bg-deactive'}`}
                            />
                        </div>
                    </div>

                    <div className="flex-[70%]">
                        <Row className="client-detail-form" gutter={[16, 24]}>
                            <Col className="text-left" span={12}>
                                <label htmlFor="name">Client Name</label>
                                <Input disabled value={clientData?.name} />
                            </Col>

                            <Col className="text-left" span={12}>
                                <label htmlFor="mobile">Mobile</label>
                                <Input disabled value={clientData?.mobile} />
                            </Col>

                            <Col className="text-left" span={12}>
                                <label htmlFor="email">Email</label>
                                <Input disabled value={clientData?.email} />
                            </Col>

                            <Col className="text-left" span={12}>
                                <label htmlFor="altMobile">
                                    Alternate Mobile
                                </label>
                                <Input disabled value={clientData?.altMobile} />
                            </Col>

                            <Col className="text-left" span={24}>
                                <label htmlFor="address">Address</label>
                                <TextArea
                                    disabled
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    value={clientData?.address}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="client-payment-history pt-10">
                    <Table
                        className="overflow-hidden rounded-xl"
                        columns={clientHistoryColumns}
                        dataSource={clientData?.membershipHistory}
                        key="clientHistoryCollection"
                        pagination={false}
                    />
                </div>
            </div>
        </Spin>
    )
}

export default ClientItem
