import { ConfigProvider } from 'antd'
import { CONFIG_THEME } from 'constants/common.constant'
import { noop } from 'lodash'
import React from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function showPortal({ content, afterClose = noop }) {
    const element = document.createElement('div')
    const target =
        document.getElementById('root-modal-wrapper') || document.body
    target.append(element)

    const root = createRoot(element)

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const _afterClose = (...args) => {
        afterClose(...args)
        element.remove()
        root.unmount()
    }

    const _content = React.cloneElement(content, {
        afterClose: _afterClose,
    })
    root.render(
        <ConfigProvider theme={CONFIG_THEME}>{_content}</ConfigProvider>
    )
}

const ModalUtil = {
    show: showPortal,
}

export default ModalUtil
