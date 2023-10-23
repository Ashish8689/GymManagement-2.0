import { Col, Input, Row, Space, Spin, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import classNames from 'classnames'
import Table from 'component/Table/Table.component'
import { isEmpty } from 'lodash'
import {
    ClientData,
    ClientMembershipHistory,
} from 'pages/client/client.interface'
import { useTranslation } from 'react-i18next'
import { TrainerData } from '../../interface/trainer.interface'
import ClientSocial from '../ClientSocial'
import message from '../CustomMessage/CustomMessage'
import { getClientByCode } from '../rest/client.rest'
import { getTrainers } from '../rest/trainer.rest'
import { getFormattedDate } from '../utils/date.utils'
import { CellRenderers } from '../utils/tableUtils'

import UserImage from '../../assets/img/t1.png'

const ClientItem: FC = () => {
    const { t } = useTranslation()
    const { code } = useParams<string>()
    const [isLoading, setIsLoading] = useState(true)
    const [clientData, setClientData] = useState<ClientData>()
    const [trainers, setTrainers] = useState<TrainerData[]>()

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

    const fetchTrainers = async (): Promise<void> => {
        try {
            const res = await getTrainers()
            setTrainers(res)
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
            title: 'Membership Ending',
            dataIndex: 'membershipEnding',
            key: 'membershipEnding',
            width: 100,
            ellipsis: true,
            render: getFormattedDate,
        },
        {
            title: 'Payment Collector',
            dataIndex: 'paymentCollector',
            key: 'paymentCollector',
            width: 120,
            ellipsis: true,
            render: (value) =>
                trainers?.find((trainer) => trainer._id === value)?.name ||
                'N/A',
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
        fetchTrainers()
    }, [])

    if (isLoading) {
        return (
            <div className="app-loading">
                <Spin size="large" />
            </div>
        )
    }

    if (isEmpty(clientData)) {
        return <h1>{t('label.client')}</h1>
    }

    return (
        <>
            <Row wrap={false}>
                <Col flex="360px">
                    <div className="profile-card">
                        <div className="profile-image-container">
                            <img
                                alt={clientData.name}
                                className="profile-image"
                                src={UserImage}
                            />
                            <div className="profile-image-rotator">
                                <div className="profile-image-rotator-icon" />
                            </div>
                        </div>
                        <Space
                            className="profile-content-container"
                            direction="vertical">
                            <Typography.Text className="profile-content-title">
                                {clientData.name}
                            </Typography.Text>
                            <ClientSocial
                                email={clientData.email}
                                mobile={clientData.mobile}
                            />
                        </Space>

                        <span
                            className={classNames(
                                'profile-status-color',
                                clientData.isActive
                                    ? 'profile-bg-active'
                                    : 'profile-bg-de-active'
                            )}
                        />
                    </div>
                </Col>

                <Col flex="auto">
                    <Row className="client-detail-form" gutter={[16, 24]}>
                        <Col className="text-left" span={12}>
                            <label htmlFor="name">
                                {t('label.entity-name', {
                                    entity: t('label.client'),
                                })}
                            </label>
                            <Input disabled value={clientData.name} />
                        </Col>

                        <Col className="text-left" span={12}>
                            <label htmlFor="mobile">{t('label.mobile')}</label>
                            <Input disabled value={clientData.mobile} />
                        </Col>

                        <Col className="text-left" span={12}>
                            <label htmlFor="email">{t('label.email')}</label>
                            <Input disabled value={clientData.email} />
                        </Col>

                        <Col className="text-left" span={12}>
                            <label htmlFor="altMobile">
                                {t('label.alternate-mobile')}
                            </label>
                            <Input disabled value={clientData.altMobile} />
                        </Col>

                        <Col className="text-left" span={24}>
                            <label htmlFor="address">
                                {t('label.address')}
                            </label>
                            <TextArea
                                disabled
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                value={clientData.address}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Table
                bordered
                className="m-t-xlg"
                columns={clientHistoryColumns}
                dataSource={clientData.membershipHistory}
                key="clientHistoryCollection"
                size="large"
            />
        </>
    )
}

export default ClientItem
