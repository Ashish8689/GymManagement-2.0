import {
    MailOutlined,
    PhoneOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons'
import React, { FC } from 'react'

interface ClientSocialLinks {
    mobile: number | undefined
    email: string | undefined
}

const ClientSocial: FC<ClientSocialLinks> = ({ mobile, email }) => {
    return (
        <div className="flex justify-center pt-3">
            <a
                className="group mx-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary py-3 duration-500 ease-in-out hover:bg-bold-light"
                href={`tel:${mobile}`}
            >
                {' '}
                <PhoneOutlined className=" rotate-90 text-[18px] text-white" />
            </a>
            <a
                className="group mx-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary py-3 duration-500 ease-in-out hover:bg-bold-light"
                href={`https://wa.me/+91${mobile}`}
                rel="noreferrer"
                target="_blank"
            >
                <WhatsAppOutlined className="text-[18px] text-white" />
            </a>

            <a
                className="group mx-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary py-3 duration-500 ease-in-out hover:bg-bold-light"
                href={`mailto:${email}`}
            >
                <MailOutlined className="text-[18px] text-white" />
            </a>
        </div>
    )
}

export default ClientSocial
