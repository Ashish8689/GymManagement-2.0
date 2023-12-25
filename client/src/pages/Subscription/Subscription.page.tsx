import {
    DownloadOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import AddSubscription from 'component/ActionMenu/AddSubscription.component'
import message from 'component/CustomMessage/CustomMessage'
import Table from 'component/Table/Table.component'
import {
    deleteSubscriptionAPI,
    getSubscriptions,
} from 'component/rest/subscription.rest'
import { CellRenderers } from 'component/utils/tableUtils'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'enums/common.enums'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subscription, SubscriptionPageData } from './Subscription.interface'

const SubscriptionPage = () => {
    const { t } = useTranslation()
    const [subscriptionData, setSubscriptionData] =
        useState<SubscriptionPageData>({
            data: [],
            isLoading: true,
        })
    const [addModel, setAddModel] = useState<boolean>(false)
    const [editSubscriptionData, setEditSubscriptionData] =
        useState<Subscription>()

    const fetchSubscriptions = async (): Promise<void> => {
        setSubscriptionData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getSubscriptions()
            setSubscriptionData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setSubscriptionData((prev) => ({ ...prev, isLoading: false }))
        }
    }

    const deleteSubscription = async (id: string): Promise<void> => {
        try {
            await deleteSubscriptionAPI(id)

            fetchSubscriptions()
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const afterCloseFetch = (): Promise<void> => fetchSubscriptions()

    const addSubscriptionModal = (): void => setAddModel(true)

    const handleEditSubscription = useCallback((record: Subscription) => {
        setAddModel(true)
        setEditSubscriptionData(record)
    }, [])

    const columns: ColumnsType<Subscription> = useMemo(
        () => [
            {
                title: t('label.entity-name', {
                    entity: t('label.subscription'),
                }),
                dataIndex: 'name',
                key: 'name',
                width: 200,
                ellipsis: true,
                fixed: 'left',
            },

            {
                title: t('label.description'),
                dataIndex: 'description',
                key: 'description',
                width: 300,
                render: CellRenderers.VALUE_OR_NA,
            },
            {
                title: t('label.price'),
                dataIndex: 'price',
                key: 'price',
                width: 150,
                align: 'center',
            },
            {
                title: t('label.duration'),
                dataIndex: 'duration',
                key: 'duration',
                width: 150,
                align: 'center',
            },
            {
                title: t('label.action'),
                key: 'action',
                width: 100,
                dataIndex: 'id',
                align: 'center',
                render: (_, record) => {
                    const items = [
                        {
                            actionType: ACTION_TYPE.EDIT,
                        },
                        {
                            actionType: ACTION_TYPE.DELETE,
                            api: deleteSubscription,
                        },
                    ]

                    return (
                        <ActionMenu
                            entity={ENTITY_TYPE.SUBSCRIPTION}
                            id={record._id}
                            items={items}
                            onClick={() => {
                                handleEditSubscription(record)
                            }}
                        />
                    )
                },
            },
        ],
        [afterCloseFetch]
    )

    const onSuccess = useCallback(() => {
        setAddModel(false)
        setEditSubscriptionData(undefined)
        fetchSubscriptions()
    }, [])

    const onCancel = useCallback(() => {
        setAddModel(false)
        setEditSubscriptionData(undefined)
    }, [])

    useEffect(() => {
        fetchSubscriptions()
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col className="text-right" span={24}>
                <Space align="start" className="w-full justify-between">
                    <Typography.Text className="title">
                        {t('label.subscription')}
                    </Typography.Text>

                    <Space size={10}>
                        <Tooltip
                            title={t('message.export-entity', {
                                entity: t('label.subscription'),
                            })}>
                            <Button
                                disabled
                                icon={<UploadOutlined />}
                                type="primary"
                                onClick={addSubscriptionModal}>
                                {t('label.export')}
                            </Button>
                        </Tooltip>

                        <Tooltip
                            title={t('message.import-entity', {
                                entity: t('label.subscription'),
                            })}>
                            <Button
                                disabled
                                icon={<DownloadOutlined />}
                                type="primary"
                                onClick={addSubscriptionModal}>
                                {t('label.import')}
                            </Button>
                        </Tooltip>

                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={addSubscriptionModal}>
                            {t('label.add-entity', {
                                entity: t('label.subscription'),
                            })}
                        </Button>
                    </Space>
                </Space>
            </Col>

            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={subscriptionData.data}
                    loading={subscriptionData.isLoading}
                    rowKey="id"
                />
            </Col>

            {addModel && (
                <AddSubscription
                    editSubscriptionData={editSubscriptionData}
                    onCancel={onCancel}
                    onSuccess={onSuccess}
                />
            )}
        </Row>
    )
}

export default SubscriptionPage
