import React, { ReactNode } from 'react'
import { message as antdMessage } from 'antd'
import { MessageType as AntdMessageType } from 'antd/lib/message'
import { AxiosError } from 'axios'
import { CloseOutlined } from '@ant-design/icons'

import { MessageType } from './common.interface'
import { get, isObject } from 'lodash'

const antdMessageContent = (
    type: string,
    heading: string,
    content: string | AxiosError,
    duration: number,
    icon?: ReactNode
): AntdMessageType => {
    const key = Math.random()
    let newHeading
    if (heading) {
        newHeading = <strong>{heading}</strong>
    }

    return antdMessage[type as keyof MessageType]({
        key,
        content: (
            <>
                {newHeading}
                {isObject(content)
                    ? get(content, 'response.data.error', '')
                    : content}
                <span
                    className="message-close"
                    onClick={() => antdMessage.destroy(key)}
                >
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
        return antdMessageContent('success', 'Success!', content, duration)
    },
    error(content: string | AxiosError, duration = 5) {
        return antdMessageContent('error', 'Failed!', content, duration)
    },
    warn(content: string, duration = 5) {
        return antdMessageContent('warning', '', content, duration)
    },
    info(content: string, duration = 5) {
        return antdMessageContent('info', '', content, duration)
    },
    loading(content: string, duration = 5) {
        return antdMessageContent('loading', '', content, duration)
    },
    open(content: string, duration = 5) {
        return antdMessageContent('open', '', content, duration)
    },
}

export default message
