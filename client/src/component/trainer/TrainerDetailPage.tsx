import { Col, Input, Row, Spin } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { AxiosError } from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ClientSocial from '../ClientSocial'
import message from '../CustomMessage'
import { TrainerData } from '../../interface/trainer.interface'
import { getTrainerByCode } from '../rest/trainer.rest'

const TrainerDetailPage: FC = () => {
    const { code } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [trainerData, setTrainerData] = useState<TrainerData>()

    const fetchTrainerDetails = async (): Promise<void> => {
        try {
            if (code) {
                const response = await getTrainerByCode(code)
                setTrainerData(response)
            }
        } catch (err) {
            message.error(err as AxiosError)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTrainerDetails()
    }, [])

    return (
        <Spin size="large" spinning={isLoading}>
            <div className="py-7 px-5">
                <div className="flex gap-10 ">
                    <div className="flex flex-[30%] content-center">
                        <div className="relative h-[400px] w-full max-w-md rounded-2xl bg-body p-5 shadow-lg">
                            <div className="relative flex h-[65%] items-center justify-center">
                                <img
                                    alt={trainerData?.name}
                                    className="h-52 w-52 rounded-full"
                                    src="/images/logo.png"
                                />
                                <div
                                    className="border-1 absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-rotate rounded-full border-solid
                                 border-bold-light content-['']"
                                >
                                    <div
                                        className={`absolute top-2 left-9 h-5 w-5 rounded-full
                                bg-primary`}
                                    />
                                </div>
                            </div>
                            <div className="flex h-[35%] flex-col items-center justify-center p-3 pb-0">
                                <h1 className="pb-2 text-2xl font-bold text-bold-light">
                                    {trainerData?.name}
                                </h1>
                                <ClientSocial
                                    email={trainerData?.email}
                                    mobile={trainerData?.mobile}
                                />
                            </div>

                            <div
                                className={` absolute top-5 right-5 h-3 w-3 rounded-full
                        ${trainerData?.isActive ? 'bg-active' : 'bg-deactive'}`}
                            />
                        </div>
                    </div>

                    <div className="flex-[70%]">
                        <Row className="client-detail-form" gutter={[16, 24]}>
                            <Col span={12}>
                                <label htmlFor="name">Client Name</label>
                                <Input disabled value={trainerData?.name} />
                            </Col>

                            <Col span={12}>
                                <label htmlFor="mobile">Mobile</label>
                                <Input disabled value={trainerData?.mobile} />
                            </Col>

                            <Col span={12}>
                                <label htmlFor="email">Email</label>
                                <Input disabled value={trainerData?.email} />
                            </Col>

                            <Col span={12}>
                                <label htmlFor="altMobile">
                                    Alternate Mobile
                                </label>
                                <Input
                                    disabled
                                    value={trainerData?.altMobile}
                                />
                            </Col>

                            <Col span={24}>
                                <label htmlFor="address">Address</label>
                                <TextArea
                                    disabled
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    value={trainerData?.address}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default TrainerDetailPage
