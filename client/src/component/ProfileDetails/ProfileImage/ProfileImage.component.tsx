import { useTranslation } from 'react-i18next'

const ProfileImage = () => {
    const { t } = useTranslation()

    return <div>{t('label.client')}</div>
}

export default ProfileImage
