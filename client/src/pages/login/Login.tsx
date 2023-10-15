import { Button, Col, Form, FormProps, Input, Row } from 'antd'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { useAuthProvider } from '../../component/AuthProvider/AuthProvider'
import message from '../../component/CustomMessage/CustomMessage'
import { authenticateLoginData } from '../../component/rest/login.rest'
import APP_ROUTE from '../../component/utils/router'
import LoginCarousel from './LoginCarousel.component'

const Login: FC = () => {
    const { t } = useTranslation()
    const { handleLogin } = useAuthProvider()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const validateMessages = {
        required: '${label} is required',
    }

    const handleSignIn: FormProps['onFinish'] = async (data) => {
        setIsLoading(true)
        try {
            const response = await authenticateLoginData(data)
            await handleLogin(response.token)
            message.success('User Login Successfully')
            navigate(APP_ROUTE.HOME)
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Row data-testid="signin-page">
            <Col span={8}>
                <img
                    alt="Gym Management"
                    className="h-20 w-20 animate-spin"
                    src={process.env.PUBLIC_URL + '/images/logo.png'}
                />

                <Form
                    form={form}
                    layout="vertical"
                    name="login_form"
                    validateMessages={validateMessages}
                    onFinish={handleSignIn}>
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item
                                label="Username or Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>
                        </Col>

                        <Col className="pt-2" span={24}>
                            <Button
                                className="w-full"
                                htmlType="submit"
                                loading={isLoading}
                                type="primary">
                                {t('label.login')}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col className="relative" span={16}>
                <LoginCarousel />
            </Col>
        </Row>
    )
}

export default Login
