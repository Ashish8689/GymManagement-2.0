import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const NoDataPlaceholder = () => {
    const { t } = useTranslation()

    return <Typography.Text>{t('label.no-data-available')}</Typography.Text>
}

export default NoDataPlaceholder
