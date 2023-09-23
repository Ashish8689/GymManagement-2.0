import { Carousel, Typography } from 'antd'
import { t } from 'i18next'
import { uniqueId } from 'lodash'
import React, { FC } from 'react'
import { LOGIN_SLIDE } from '../../constants/login.constant'

const LoginCarousel: FC = () => {
    return (
        <div className="carousal-container" data-testid="carousel-container">
            <Carousel autoplay dots autoplaySpeed={3000} easing="ease-in-out">
                {LOGIN_SLIDE.map((data) => (
                    <div
                        className="text-center"
                        data-testid="slider-container"
                        key={uniqueId()}
                    >
                        <Typography.Title className="text-primary" level={1}>
                            {t(`label.${data.title}`)}
                        </Typography.Title>
                        <p
                            className="m-b-lg carousal-description text-grey-muted"
                            data-testid="carousel-slide-description"
                        >
                            {t(`message.${data.descriptionKey}`)}
                        </p>
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
