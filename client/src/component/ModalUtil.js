import React from 'react'
import { createRoot } from 'react-dom/client'
import { noop } from 'lodash'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function showPortal({ content, afterClose = noop }) {
    const element = document.createElement('div')
    const target =
        document.getElementById('root-modal-wrapper') || document.body
    target.append(element)

    const root = createRoot(element)

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const _afterClose = async (...args) => {
        console.log('ModalUtil afterClose function call!')
        afterClose(...args)
        await element.remove()
        root.unmount()
    }

    const _content = React.cloneElement(content, {
        afterClose: _afterClose,
    })
    root.render(_content)
}

const ModalUtil = {
    show: showPortal,
}

export default ModalUtil
