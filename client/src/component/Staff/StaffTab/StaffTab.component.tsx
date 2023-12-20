import {
    DownloadOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Tooltip, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const StaffTab = () => {
    const { t } = useTranslation()

    const addStaffModal = () => {
        console.log('addStaffModal')
    }

    return (
        <Row className="m-t-md" gutter={[20, 20]}>
            <Col span={24}>
                <Space align="start" className="w-full justify-between">
                    <Typography.Text className="title">
                        {t('label.staff-plural')}
                    </Typography.Text>

                    <Space size={10}>
                        <Tooltip
                            title={t('message.export-entity', {
                                entity: t('label.client'),
                            })}>
                            <Button
                                disabled
                                icon={<UploadOutlined />}
                                type="primary"
                                onClick={addStaffModal}>
                                {t('label.export')}
                            </Button>
                        </Tooltip>

                        <Tooltip
                            title={t('message.import-entity', {
                                entity: t('label.client'),
                            })}>
                            <Button
                                disabled
                                icon={<DownloadOutlined />}
                                type="primary"
                                onClick={addStaffModal}>
                                {t('label.import')}
                            </Button>
                        </Tooltip>

                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={addStaffModal}>
                            {t('label.add-entity', {
                                entity: t('label.staff'),
                            })}
                        </Button>
                    </Space>
                </Space>
            </Col>

            <Col span={24} />
        </Row>
    )
}

export default StaffTab
