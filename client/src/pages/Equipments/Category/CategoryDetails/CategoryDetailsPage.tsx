import { PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Row, Space, Typography } from 'antd'
import { AxiosError } from 'axios'
import message from 'component/CustomMessage/CustomMessage'
import AddEquipmentStepperModal from 'component/GymEquipments/AddEquipmentStepper/AddEquipmentStepperModal.component'
import ModalUtil from 'component/ModalUtil'
import NoDataPlaceholder from 'component/NoDataPlaceholder/NoDataPlaceholder.component'
import { getCategoryByName } from 'component/rest/equipmentCategory.rest'
import APP_ROUTE from 'component/utils/router'
import { ACTION_TYPE } from 'constants/action.constants'
import { isEmpty } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { CategoryDetails } from './CategoryDetails.interface'
import './category.style.less'

const CategoryDetailsPage = () => {
    const { t } = useTranslation()
    const { categoryName } = useParams<{ categoryName: string }>()
    const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>({
        data: undefined,
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

    const fetchCategoryDetails = async () => {
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
    }

    const addEquipmentModal = (): void => {
        ModalUtil.show({
            content: (
                <AddEquipmentStepperModal
                    actionType={ACTION_TYPE.ADD}
                    onSuccess={() => fetchCategoryDetails()}
                />
            ),
        })
    }

    useEffect(() => {
        fetchCategoryDetails()
    }, [])

    if (isEmpty(categoryDetails.data)) {
        return <NoDataPlaceholder />
    }

    return (
        <Row>
            <Col span={24}>
                <Space align="start" className="w-full justify-between">
                    <Space direction="vertical" size={2}>
                        <Breadcrumb items={breadcrumbItems} />
                        <Typography.Text className="category-title">
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
        </Row>
    )
}

export default CategoryDetailsPage
