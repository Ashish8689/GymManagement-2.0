import { CloseOutlined } from '@ant-design/icons'
import { message as antdMessage } from 'antd'
import { MessageType } from 'antd/es/message/interface'
import { AxiosError } from 'axios'
import { get, isObject } from 'lodash'
import { ReactNode } from 'react'
import { CustomMessageType } from './customMessage.interface'

const messageContent = (
    type: string,
    heading: string,
    content: string | AxiosError,
    duration: number,
    icon?: ReactNode
): MessageType => {
    const key = Math.random()
    let newHeading
    if (heading) {
        newHeading = <strong>{heading}</strong>
    }

    return antdMessage[type as keyof CustomMessageType]({
        key,
        content: (
            <>
                {newHeading}
                {isObject(content)
                    ? get(content, 'response.data.error', '')
                    : content}
                <span
                    className="message-close"
                    onClick={() => antdMessage.destroy(key)}>
                    <CloseOutlined />
                </span>
            </>
        ),
        icon,
        duration,
    })
}

const message = {
    success(content: string, duration = 5) {
        return messageContent('success', 'Success!', content, duration)
    },
    error(content: string | AxiosError, duration = 5) {
        return messageContent('error', 'Failed!', content, duration)
    },
    warning(content: string, duration = 5) {
        return messageContent('warning', '', content, duration)
    },
    info(content: string, duration = 5) {
        return messageContent('info', '', content, duration)
    },
    loading(content: string, duration = 5) {
        return messageContent('loading', '', content, duration)
    },
    open(content: string, duration = 5) {
        return messageContent('open', '', content, duration)
    },
}

export default message
