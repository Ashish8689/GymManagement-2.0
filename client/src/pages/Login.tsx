import React, { FC, useState } from 'react'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form, FormProps, Input, Row } from 'antd'

import { authenticateLoginData } from '../component/rest/login.rest'
import message from '../component/CustomMessage'
import APP_ROUTE from '../component/utils/router'
import { useAuthProvider } from '../component/AuthProvider/AuthProvider'

const Login: FC = () => {
    const { handleLogin } = useAuthProvider()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    console.log(handleLogin)

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
            navigate(APP_ROUTE.DASHBOARD)
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-primary">
            <div className="w-full max-w-sm rounded-md bg-body p-10 pt-5 shadow-2xl">
                <div className="mb-8 text-center">
                    <img
                        alt="Gym Management"
                        className="h-20 w-20 animate-spin"
                        src={process.env.PUBLIC_URL + '/images/logo.png'}
                    />
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    name="login_form"
                    validateMessages={validateMessages}
                    onFinish={handleSignIn}
                >
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item
                                label="Username or Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
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
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>

                        <Col className="pt-2" span={24}>
                            <Button
                                className="w-full"
                                htmlType="submit"
                                loading={isLoading}
                                type="primary"
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Login
