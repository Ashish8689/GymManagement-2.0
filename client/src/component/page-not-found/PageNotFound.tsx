import { Typography } from 'antd'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const PageNotFound: FC = () => {
    const { t } = useTranslation()

    return (
        <div className="pageNotFoundContainer">
            <Typography.Title>{t('message.page-not-found')}</Typography.Title>
        </div>
    )
}

export default PageNotFound
