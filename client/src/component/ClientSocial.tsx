import {
    MailOutlined,
    PhoneOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons'
import { Space } from 'antd'
import { FC } from 'react'

interface ClientSocialLinks {
    mobile: number | undefined
    email: string | undefined
}

const ClientSocial: FC<ClientSocialLinks> = ({ mobile, email }) => {
    return (
        <Space className="profile-social-container" size="middle">
            <a className="profile-social-icon" href={`tel:${mobile}`}>
                <PhoneOutlined className=" rotate-90 text-[18px] text-white" />
            </a>
            <a
                className="profile-social-icon"
                href={`https://wa.me/+91${mobile}`}
                rel="noreferrer"
                target="_blank">
                <WhatsAppOutlined className="text-[18px] text-white" />
            </a>

            {email && (
                <a className="profile-social-icon" href={`mailto:${email}`}>
                    <MailOutlined className="text-[18px] text-white" />
                </a>
            )}
        </Space>
    )
}

export default ClientSocial
