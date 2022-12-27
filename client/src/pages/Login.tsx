import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
// import { Adduser, setAdmin } from '../../features/User/UserSlice'
import message from '../component/CustomMessage'
import { AxiosError } from 'axios'
import { Button, Col, Form, Input, Row } from 'antd'
import { authenticateLoginData } from '../component/rest/login.rest'

const Login: FC = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const validateMessages = {
        required: '${label} is required',
    }

    const handleSignIn = async (): Promise<void> => {
        await form.validateFields()
        try {
            const data = await form.getFieldsValue()
            const response = await authenticateLoginData(data)
            console.log(response)

            // dispatch(Adduser(response))
        } catch (err) {
            message.error(err as AxiosError)
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
