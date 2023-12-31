import { Card, Col, Row, Typography } from 'antd'
import classNames from 'classnames'
import { StaffCategoryData } from 'pages/Staff/Staff.interface'
import React, { FC, useMemo } from 'react'
import './category-card.style.less'

interface CategoryCardProps {
    data: StaffCategoryData
}

const CategoryCard: FC<CategoryCardProps> = ({ data }) => {
    const detailsLength = useMemo(() => data.details.length, [data.details])

    return (
        <Card className="category-card" title={data.category}>
            <Row>
                {data.details.map((detail, index) => (
                    <React.Fragment key={`${detail.label}-${detail.value}`}>
                        <Col
                            className={classNames('category-rows', {
                                'category-rows-border':
                                    detailsLength - 1 !== index,
                            })}
                            span={12}>
                            <Typography.Text className="category-title">
                                {detail.label}
                            </Typography.Text>
                        </Col>
                        <Col
                            className={classNames('category-rows', {
                                'category-rows-border':
                                    detailsLength - 1 !== index,
                            })}
                            span={12}>
                            <Typography.Text className="category-value">
                                {detail.value}
                            </Typography.Text>
                        </Col>
                    </React.Fragment>
                ))}
            </Row>
        </Card>
    )
}

export default CategoryCard
