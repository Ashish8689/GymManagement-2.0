import { Col, Form, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { FC, useCallback } from 'react'
import BaseModal from '../BaseModal'

interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
}

interface ClientModal {
    open: boolean
    formData: any
    actionType: ActionType
    onClose: () => void
}

const DeactivateModal: FC<ClientModal> = ({
    actionType: { title, buttonLabel, successMessage, value },
    formData,
    open,
    onClose,
}) => {
    const [form] = Form.useForm()

    const _onOk = useCallback(async () => {
        await form.validateFields()
        // try {
        //  const _response = await form.getFieldsValue()
        //  console.log(_response)
        // } catch (error) {
        //     throw error
        // }
    }, [form])

    const _modalProps = {
        title: 'Deactivate',
        buttonLabel: 'Deactivate',
        onOk: _onOk,
    }

    return (
        <BaseModal
            modalProps={_modalProps}
            open={open}
            setComponentModal={(value: boolean) => value}
            onClose={onClose}
        >
            <Form
                autoComplete="off"
                form={form}
                // initialValues={formData}
                layout="vertical"
                name="Add_Client"
            >
                <Row gutter={20}>
                    <Col span={24}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Address is required',
                                },
                            ]}
                        >
                            <TextArea
                                autoSize={{ minRows: 2, maxRows: 3 }}
                                maxLength={6}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </BaseModal>
    )
}

export default DeactivateModal
