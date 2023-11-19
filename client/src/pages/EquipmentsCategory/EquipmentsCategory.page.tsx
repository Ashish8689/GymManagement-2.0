import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import AddEquipmentsCategory from 'component/GymEquipments/AddEquipmentsCategory/AddEquipmentsCategory.component'
import ModalUtil from 'component/ModalUtil'
import Table from 'component/Table/Table.component'
import { getEquipmentCategory } from 'component/rest/equipmentCategory.rest'
import { ACTION_TYPE } from 'constants/action.constants'
import { TRAINER_ACTIONS } from 'constants/trainer.constant'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CategoryData, EquipmentCategoryData } from './equipments.interface'

const Equipments = () => {
    const { t } = useTranslation()
    const [equipmentCategoryData, setEquipmentCategoryData] =
        useState<EquipmentCategoryData>({
            data: [],
            isLoading: true,
        })

    const fetchEquipmentCategory = useCallback(async (): Promise<void> => {
        setEquipmentCategoryData((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await getEquipmentCategory()
            setEquipmentCategoryData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setEquipmentCategoryData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [setEquipmentCategoryData])

    const afterCloseFetch = (): Promise<void> => fetchEquipmentCategory()

    const addEquipmentCategoryModal = (): void => {
        ModalUtil.show({
            content: (
                <AddEquipmentsCategory
                    actionType={ACTION_TYPE.ADD}
                    onSuccess={() => fetchEquipmentCategory()}
                />
            ),
            afterClose: afterCloseFetch,
        })
    }

    const onClick = (name: ACTION_TYPE, data: CategoryData): void => {
        switch (name) {
            case ACTION_TYPE.EDIT:
                // editTrainerModal(data)
                console.log(data)

                break
            case ACTION_TYPE.DELETE:
                console.log('delete')

                break
            default:
                break
        }
    }

    const columns: ColumnsType<CategoryData> = useMemo(
        () => [
            {
                title: t('label.category'),
                dataIndex: 'category',
                key: 'category',
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
                        {
                            type: ACTION_TYPE.DELETE,
                            actionType: TRAINER_ACTIONS.DELETE,
                        },
                    ]

                    return (
                        <ActionMenu
                            afterClose={afterCloseFetch}
                            id={record._id}
                            items={items}
                            onClick={(type: ACTION_TYPE) =>
                                onClick(type, record)
                            }
                        />
                    )
                },
            },
        ],
        [onClick, afterCloseFetch]
    )

    useEffect(() => {
        fetchEquipmentCategory()
    }, [fetchEquipmentCategory])

    return (
        <Row gutter={[20, 20]}>
            <Col className="text-right" span={24}>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => addEquipmentCategoryModal()}>
                    {t('label.add-entity', {
                        entity: t('label.category'),
                    })}
                </Button>
            </Col>
            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={equipmentCategoryData.data}
                    loading={equipmentCategoryData.isLoading}
                    rowKey="id"
                    scroll={{
                        x: 1500,
                    }}
                />
            </Col>
        </Row>
    )
}

export default Equipments
