import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import AddEquipmentsCategory from 'component/GymEquipments/AddEquipmentsCategory/AddEquipmentsCategory.component'
import ModalUtil from 'component/ModalUtil'
import Table from 'component/Table/Table.component'
import { getCategoryList } from 'component/rest/equipmentCategory.rest'
import APP_ROUTE from 'component/utils/router'
import { CellRenderers } from 'component/utils/tableUtils'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'constants/common.constant'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Category, EquipmentCategoryData } from './category.interface'

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
            const res = await getCategoryList()
            setEquipmentCategoryData((prev) => ({ ...prev, data: res }))
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setEquipmentCategoryData((prev) => ({ ...prev, isLoading: false }))
        }
    }, [setEquipmentCategoryData])

    const deleteCategory = async (id: string): Promise<void> => {
        console.log(id)
    }

    const addEquipmentCategoryModal = (): void => {
        ModalUtil.show({
            content: (
                <AddEquipmentsCategory
                    actionType={ACTION_TYPE.ADD}
                    onSuccess={() => fetchEquipmentCategory()}
                />
            ),
        })
    }

    const editEquipmentCategoryModal = (data: Category): void => {
        ModalUtil.show({
            content: (
                <AddEquipmentsCategory
                    actionType={ACTION_TYPE.EDIT}
                    initialValues={data}
                    onSuccess={() => fetchEquipmentCategory()}
                />
            ),
        })
    }

    const onClick = (type: ACTION_TYPE, data: Category): void => {
        if (type === ACTION_TYPE.EDIT) {
            editEquipmentCategoryModal(data)
        }
    }

    const columns = useMemo(() => {
        const data: ColumnsType<Category> = [
            {
                title: t('label.category'),
                dataIndex: 'category',
                key: 'category',
                width: 200,
                render: (category) => {
                    return (
                        <Link
                            className="text-primary"
                            to={`${APP_ROUTE.GYM_EQUIPMENTS_CATEGORY}/${category}`}>
                            {category}
                        </Link>
                    )
                },
            },
            {
                title: t('label.description'),
                dataIndex: 'description',
                key: 'description',
                width: 300,
                render: CellRenderers.VALUE_OR_NA,
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
                        },
                        {
                            type: ACTION_TYPE.DELETE,
                            api: deleteCategory,
                        },
                    ]

                    return (
                        <ActionMenu
                            entity={ENTITY_TYPE.CATEGORY}
                            id={record._id}
                            items={items}
                            onClick={(type: ACTION_TYPE) =>
                                onClick(type, record)
                            }
                        />
                    )
                },
            },
        ]

        return data
    }, [onClick, deleteCategory])

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
                    rowKey="_id"
                />
            </Col>
        </Row>
    )
}

export default Equipments
