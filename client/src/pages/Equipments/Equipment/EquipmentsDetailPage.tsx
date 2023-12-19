import { useTranslation } from 'react-i18next'

const EquipmentsDetailPage = () => {
    const { t } = useTranslation()

    return <div>{t('label.equipment')}</div>
}

export default EquipmentsDetailPage
