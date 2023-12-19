import { Col, Form, Input, Row, Typography } from 'antd'
import { AxiosError } from 'axios'
import { FC, useMemo, useState } from 'react'

import { Transi18next } from 'component/utils/common.utils'
import { ACTION_TYPE } from 'constants/action.constants'
import { capitalize } from 'lodash'
import { useTranslation } from 'react-i18next'
import BaseModal from '../../BaseModal/BaseModal'
import message from '../../CustomMessage/CustomMessage'
import { DeactivateModalProps } from './deactivate.interface'

const DeactivateModal: FC<DeactivateModalProps> = ({
    id,
    entity,
    actionType,
    api,
}) => {
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [isSaveDisable, setIsSaveDisable] = useState(true)

    const isDeleteAction = useMemo(
        () => actionType === ACTION_TYPE.DELETE,
        [actionType]
    )

    const actionLabel = useMemo(
        () => (isDeleteAction ? t('label.delete') : t('label.deactivate')),
        [isDeleteAction]
    )

    const { title, successMessage, saveButtonLabel } = useMemo(() => {
        return {
            saveButtonLabel: actionLabel,
            title: t('label.action-entity', {
                action: actionLabel,
                entity: capitalize(entity),
            }),
            successMessage: t('message.successfully-action-entity', {
                action: actionLabel,
                entity: capitalize(entity),
            }),
        }
    }, [actionLabel, actionType, isDeleteAction])

    const onSave = async (): Promise<void> => {
        try {
            api && (await api(id))
            message.success(successMessage)
        } catch (error) {
            message.error(error as AxiosError)
        }
    }

    const modalProps = {
        title,
        saveButtonLabel,
        onOk: onSave,
    }

    const handleDeactivateChange = (): void => {
        if (form.getFieldValue('delete') === 'DELETE') {
            setIsSaveDisable(false)
        } else {
            !isSaveDisable && setIsSaveDisable(true)
        }
    }

    return (
        <BaseModal
            isSaveDisable={isSaveDisable}
            modalProps={modalProps}
            width={480}>
            <Form autoComplete="off" form={form} layout="vertical">
                <Row gutter={20}>
                    <Col span={24}>
                        <Typography.Text>
                            {t('message.are-you-sure-to-action-entity', {
                                action: actionLabel,
                                entity: capitalize(entity),
                            })}
                        </Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={
                                <Typography.Text>
                                    <Transi18next
                                        i18nKey="message.type-delete-to-confirm"
                                        renderElement={<strong />}
                                    />
                                </Typography.Text>
                            }
                            name="delete"
                            style={{ marginBottom: 0 }}>
                            <Input
                                placeholder="DELETE"
                                onChange={handleDeactivateChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default DeactivateModal
