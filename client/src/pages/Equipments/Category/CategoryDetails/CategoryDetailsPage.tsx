import { PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AxiosError } from 'axios'
import ActionMenu from 'component/ActionMenu/ActionMenu'
import message from 'component/CustomMessage/CustomMessage'
import AddEquipmentStepperModal from 'component/GymEquipments/AddEquipmentStepper/AddEquipmentStepperModal.component'
import ModalUtil from 'component/ModalUtil'
import NoDataPlaceholder from 'component/NoDataPlaceholder/NoDataPlaceholder.component'
import {
    deleteEquipmentAPI,
    getCategoryByName,
    getEquipmentsByCategory,
} from 'component/rest/equipmentCategory.rest'
import APP_ROUTE from 'component/utils/router'
import { CellRenderers } from 'component/utils/tableUtils'
import { ACTION_TYPE } from 'constants/action.constants'
import { ENTITY_TYPE } from 'enums/common.enums'
import { isEmpty } from 'lodash'
import { Equipment } from 'pages/Equipments/Equipment/Equipment.interface'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { CategoryDetails, EquipmentListData } from './CategoryDetails.interface'

const CategoryDetailsPage = () => {
    const { t } = useTranslation()
    const { categoryName } = useParams<{ categoryName: string }>()
    const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>({
        data: undefined,
        isLoading: true,
    })
    const [equipmentList, setEquipmentList] = useState<EquipmentListData>({
        data: [],
        isLoading: true,
    })

    const breadcrumbItems = useMemo(
        () => [
            {
                title: (
                    <Link to={APP_ROUTE.GYM_EQUIPMENTS_CATEGORY}>
                        {t('label.category')}
                    </Link>
                ),
            },
            {
                title: categoryName,
            },
        ],
        [categoryName]
    )

    const fetchCategoryDetails = useCallback(async () => {
        if (categoryName) {
            try {
                const res = await getCategoryByName(categoryName)

                setCategoryDetails((prev) => ({ ...prev, data: res }))
            } catch (err) {
                message.error(err as AxiosError)
            } finally {
                setCategoryDetails((prev) => ({
                    ...prev,
                    isLoading: false,
                }))
            }
        }
    }, [categoryName, setCategoryDetails])

    const fetchEquipmentCategory = useCallback(async (): Promise<void> => {
        if (categoryName) {
            setEquipmentList((prev) => ({ ...prev, isLoading: true }))
            try {
                const res = await getEquipmentsByCategory(categoryName)
                setEquipmentList((prev) => ({ ...prev, data: res }))
            } catch (err) {
                message.error(err as AxiosError)
            } finally {
                setEquipmentList((prev) => ({ ...prev, isLoading: false }))
            }
        }
    }, [categoryName, setEquipmentList])

    const addEquipmentModal = useCallback((): void => {
        categoryName &&
            ModalUtil.show({
                content: (
                    <AddEquipmentStepperModal
                        actionType={ACTION_TYPE.ADD}
                        category={categoryName}
                        onSuccess={() => fetchEquipmentCategory()}
                    />
                ),
            })
    }, [categoryName, fetchEquipmentCategory])

    const deleteEquipment = async (id: string): Promise<void> => {
        try {
            await deleteEquipmentAPI(id)
            fetchEquipmentCategory()
        } catch (error) {
            console.error(error)

            throw error
        }
    }

    const columns = useMemo(() => {
        const data: ColumnsType<Equipment> = [
            {
                title: t('label.equipment'),
                dataIndex: 'equipment',
                key: 'equipment',
                width: 200,
                render: (equipment) => {
                    return (
                        <Link
                            className="text-primary"
                            to={`${APP_ROUTE.GYM_EQUIPMENTS_CATEGORY}/${equipment}`}>
                            {equipment}
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
                title: t('label.quantity'),
                dataIndex: 'quantity',
                key: 'quantity',
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
                            api: deleteEquipment,
                        },
                    ]

                    return (
                        <ActionMenu
                            entity={ENTITY_TYPE.CATEGORY}
                            id={record._id}
                            items={items}
                            onClick={(type: ACTION_TYPE) =>
                                // onClick(type, record)
                                console.log({ type, record })
                            }
                        />
                    )
                },
            },
        ]

        return data
    }, [deleteEquipment])

    useEffect(() => {
        fetchCategoryDetails()
        fetchEquipmentCategory()
    }, [fetchEquipmentCategory, fetchCategoryDetails])

    if (isEmpty(categoryDetails.data)) {
        return <NoDataPlaceholder />
    }

    return (
        <Row gutter={[0, 20]}>
            <Col span={24}>
                <Space align="start" className="w-full justify-between">
                    <Space direction="vertical" size={2}>
                        <Breadcrumb items={breadcrumbItems} />
                        <Typography.Text className="title">
                            {categoryDetails.data.category}
                        </Typography.Text>
                    </Space>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => addEquipmentModal()}>
                        {t('label.add-entity', {
                            entity: t('label.equipment'),
                        })}
                    </Button>
                </Space>
            </Col>
            <Col span={24}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={equipmentList.data}
                    loading={equipmentList.isLoading}
                    rowKey="_id"
                />
            </Col>
        </Row>
    )
}

export default CategoryDetailsPage
