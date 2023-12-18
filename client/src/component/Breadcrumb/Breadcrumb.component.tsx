import { useTranslation } from 'react-i18next'

const Breadcrumb = () => {
    const { t } = useTranslation()

    return <h1>{t('label.client')}</h1>
}

export default Breadcrumb
