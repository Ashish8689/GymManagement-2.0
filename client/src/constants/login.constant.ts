import { CarouselProps } from 'antd'
import discoveryImg from '../assets/img/data-discovery.png'
import governanceImg from '../assets/img/data-governance.png'
import insightImg from '../assets/img/data-insights.png'
import dataQualityImg from '../assets/img/data-qauality.png'
import i18n from 'component/utils/i18next/LocalUtils'

export const LOGIN_SLIDE = [
    {
        title: i18n.t('label.client'),
        image: discoveryImg,
        descriptionKey: 'carousel-description',
    },
    {
        title: i18n.t('label.trainer'),
        image: dataQualityImg,
        descriptionKey: 'carousel-description',
    },
    {
        title: i18n.t('label.equipment'),
        image: governanceImg,
        descriptionKey: 'carousel-description',
    },
    {
        title: i18n.t('label.branch'),
        image: insightImg,
        descriptionKey: 'carousel-description',
    },
]

export const LOGIN_CAROUSEL_SETTINGS = {
    autoplay: true,
    prefixCls: 'login-carousel',
    dots: {
        className: 'carousel-dots',
    },
    slidesToShow: 1,
    slidesToScroll: 1,
} as CarouselProps
