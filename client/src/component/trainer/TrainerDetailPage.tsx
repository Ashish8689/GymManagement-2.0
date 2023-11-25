import { Col, Form, Input, Row, Space, Spin, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { AxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { TrainerData } from '../../interface/trainer.interface'
import ClientSocial from '../ClientSocial'
import message from '../CustomMessage/CustomMessage'
import { getTrainerByCode } from '../rest/trainer.rest'

import classNames from 'classnames'
import { isEmpty } from 'lodash'
import UserImage from '../../assets/img/t1.png'

const TrainerDetailPage: FC = () => {
    const { t } = useTranslation()
    const { code } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [trainerData, setTrainerData] = useState<TrainerData>()

    const fetchTrainerDetails = async (): Promise<void> => {
        try {
            if (code) {
                const response = await getTrainerByCode(code)
                setTrainerData(response)
            }
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTrainerDetails()
    }, [])

    if (isLoading) {
        return (
            <div className="app-loading">
                <Spin size="large" />
            </div>
        )
    }

    if (isEmpty(trainerData)) {
        return <h1>{t('label.trainer')}</h1>
    }

    return (
        <Row wrap={false}>
            <Col flex="360px">
                <div className="profile-card">
                    <div className="profile-image-container">
                        <img
                            alt={trainerData.name}
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
                            {trainerData.name}
                        </Typography.Text>
                        <ClientSocial
                            email={trainerData.email}
                            mobile={trainerData.mobile}
                        />
                    </Space>

                    <span
                        className={classNames(
                            'profile-status-color',
                            trainerData.isActive
                                ? 'profile-bg-active'
                                : 'profile-bg-de-active'
                        )}
                    />
                </div>
            </Col>

            <Col flex="auto">
                <Form autoComplete="off">
                    <Row className="client-detail-form" gutter={[16, 24]}>
                        <Col className="text-left" span={12}>
                            <label htmlFor="name">
                                {t('label.entity-name', {
                                    entity: t('label.client'),
                                })}
                            </label>
                            <Input disabled value={trainerData.name} />
                        </Col>

                        <Col className="text-left" span={12}>
                            <label htmlFor="mobile">{t('label.mobile')}</label>
                            <Input disabled value={trainerData.mobile} />
                        </Col>

                        <Col className="text-left" span={12}>
                            <label htmlFor="email">{t('label.email')}</label>
                            <Input disabled value={trainerData.email} />
                        </Col>

                        <Col className="text-left" span={12}>
                            <label htmlFor="altMobile">
                                {t('label.alternate-mobile')}
                            </label>
                            <Input disabled value={trainerData.altMobile} />
                        </Col>

                        <Col className="text-left" span={24}>
                            <label htmlFor="address">
                                {t('label.address')}
                            </label>
                            <TextArea
                                disabled
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                value={trainerData.address}
                            />
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

export default TrainerDetailPage
