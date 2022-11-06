import React, { FC } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { noop } from 'lodash'
import { EditOutlined, MoreOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'

import DeactivateModal from '../componentModal/deactivate/DeactivateModal'
import ModalUtil from '../ModalUtil'
import { ActionMenuItems, ActionMenuProps } from './ActionMenu.interface'
import { actionMenuDefaultValues } from '../../constants/common'
import { ActionType } from '../../interface/action.interface'

const ActionMenu: FC<ActionMenuProps> = ({
    data,
    items,
    onClick = noop,
    afterClose,
}) => {
    const onDeactivate = (
        id: string,
        actionType: ActionType,
        api: (id: string) => Promise<void>
    ): void => {
        ModalUtil.show({
            content: (
                <DeactivateModal
                    actionType={actionType}
                    api={api}
                    id={id}
                    onClose={() => console.log('deactivate modal is close')}
                />
            ),
            afterClose: afterClose,
        })
    }

    const onActionClick = ({ key, domEvent }: MenuInfo): void => {
        domEvent.stopPropagation()
        const item = items[+key]
        switch (item.type) {
            case 'deactivate':
                onDeactivate(data._id, item.actionType, item.api)

                break
            default:
                onClick(item.type, data)

                break
        }
    }

    const menuItems = (): ActionMenuItems[] =>
        items.map((item, index) => ({
            label: actionMenuDefaultValues[item.type]?.text || 'N/A',
            icon: actionMenuDefaultValues[item.type]?.icon || <EditOutlined />,
            key: index.toString(),
            onClick: onActionClick,
        }))

    return (
        <Dropdown
            overlay={<Menu items={menuItems()} />}
            overlayStyle={{ minWidth: 150 }}
            trigger={['click']}
        >
            <Button
                size="small"
                type="text"
                onClick={(e) => e.stopPropagation()}
            >
                <MoreOutlined />
            </Button>
        </Dropdown>
    )
}

export default ActionMenu
