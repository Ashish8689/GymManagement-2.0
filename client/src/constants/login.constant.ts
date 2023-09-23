import { CarouselProps } from 'antd'
import collaborationImg from '../assets/img/data-collaboration.png'
import discoveryImg from '../assets/img/data-discovery.png'
import governanceImg from '../assets/img/data-governance.png'
import insightImg from '../assets/img/data-insights.png'
import dataQualityImg from '../assets/img/data-qauality.png'

export const LOGIN_SLIDE = [
    {
        title: 'data-discovery',
        image: discoveryImg,
        descriptionKey: 'enables-end-to-end-metadata-management',
    },
    {
        title: 'data-quality',
        image: dataQualityImg,
        descriptionKey:
            'discover-your-data-and-unlock-the-value-of-data-assets',
    },
    {
        title: 'governance',
        image: governanceImg,
        descriptionKey: 'assess-data-reliability-with-data-profiler-lineage',
    },
    {
        title: 'data-insight-plural',
        image: insightImg,
        descriptionKey: 'fosters-collaboration-among-producers-and-consumers',
    },
    {
        title: 'data-collaboration',
        image: collaborationImg,
        descriptionKey: 'deeply-understand-table-relations-message',
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
