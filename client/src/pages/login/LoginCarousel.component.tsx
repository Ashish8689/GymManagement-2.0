import { Carousel, Space, Typography } from 'antd'
import { t } from 'i18next'
import { uniqueId } from 'lodash'
import { FC } from 'react'
import { LOGIN_SLIDE } from '../../constants/login.constant'

const LoginCarousel: FC = () => {
    return (
        <div className="carousal-container" data-testid="carousel-container">
            <Carousel
                autoplay
                dots
                infinite
                autoplaySpeed={3000}
                easing="ease-in-out"
                effect="fade">
                {LOGIN_SLIDE.map((data) => (
                    <div
                        className="text-center"
                        data-testid="slider-container"
                        key={uniqueId()}>
                        <Space
                            className="carousel-content"
                            direction="vertical"
                            size="middle">
                            <Typography.Title
                                className="m-0 carousal-title"
                                level={1}>
                                {t('label.entity-management', {
                                    entity: data.title,
                                })}
                            </Typography.Title>
                            <Typography.Paragraph
                                className="carousal-description"
                                data-testid="carousel-slide-description">
                                {t(`message.${data.descriptionKey}`)}
                            </Typography.Paragraph>
                        </Space>

                        <img
                            alt="slider"
                            loading="lazy"
                            src={data.image}
                            style={{ display: 'initial' }}
                            width="750px"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default LoginCarousel
