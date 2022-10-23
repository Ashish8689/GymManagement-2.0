import React, { FC } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { noop } from 'lodash'
import { EditOutlined, MoreOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'

import DeactivateModal from '../componentModal/DeactivateModal'
import ModalUtil from '../ModalUtil'
import { ActionMenuItems, ActionMenuProps } from './ActionMenu.interface'
import { actionMenuDefaultValues } from '../../constants/common'
import { ActionType } from '../../types/actionTypes'

const ActionMenu: FC<ActionMenuProps> = ({ data, items, onClick = noop }) => {
    const onDeactivate = (data: any, actionType: ActionType): void => {
        ModalUtil.show({
            content: (
                <DeactivateModal
                    actionType={actionType}
                    formData={data}
                    onClose={() => console.log('deactivate modal is close')}
                />
            ),
        })
    }

    const onActionClick = ({ key, domEvent }: MenuInfo): void => {
        domEvent.stopPropagation()
        const item = items[+key]
        switch (item.type) {
            case 'deactivate':
                onDeactivate(data, item.actionType)

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
