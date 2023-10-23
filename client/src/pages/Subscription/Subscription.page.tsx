import { Button, Col, Row } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import Table from 'component/Table/Table.component'
import { getSubscriptions } from 'component/rest/subscription.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { TRAINER_ACTIONS } from 'constants/trainer.constant'
import { useEffect, useMemo, useState } from 'react'
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

    const afterCloseFetch = (): Promise<void> => fetchSubscriptions()

    const addTrainerModal = (): void => setAddModel(true)

    const columns: ColumnsType<Subscription> = useMemo(
        () => [
            {
                title: t('label.entity-name', {
                    entity: t('label.trainer'),
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
                            type: ACTION_TYPE.EDIT,
                            actionType: TRAINER_ACTIONS.EDIT,
                        },
                    ]

                    return (
                        <ActionMenu
                            afterClose={afterCloseFetch}
                            id={record._id}
                            items={items}
                            onClick={(type: ACTION_TYPE) => {
                                // onClick(type, record)
                                console.log('onclick ', type)
                            }}
                        />
                    )
                },
            },
        ],
        [afterCloseFetch]
    )

    console.log(addModel)

    useEffect(() => {
        fetchSubscriptions()
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col className="text-right" span={24}>
                <Button type="primary" onClick={addTrainerModal}>
                    {t('label.add-entity', {
                        entity: t('label.trainer'),
                    })}
                </Button>
            </Col>
            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={subscriptionData.data}
                    loading={subscriptionData.isLoading}
                    rowKey="id"
                    scroll={{
                        x: 1500,
                    }}
                />
            </Col>
        </Row>
    )
}

export default SubscriptionPage
