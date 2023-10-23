import { EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { noop } from 'lodash'
import { MenuInfo } from 'rc-menu/lib/interface'
import { FC } from 'react'

import { actionMenuDefaultValues } from '../../constants/common.constant'
import { ActionType } from '../../interface/action.interface'
import ModalUtil from '../ModalUtil'
import DeactivateModal from '../componentModal/deactivate/DeactivateModal'
import { ActionMenuItems, ActionMenuProps } from './ActionMenu.interface'

const ActionMenu: FC<ActionMenuProps> = ({
    data,
    items,
    onClick = noop,
    afterClose,
}) => {
    const onDeactivate = (
        id: string,
        actionType: ActionType,
        api?: (id: string) => Promise<void>
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
            trigger={['click']}>
            <Button
                size="small"
                type="text"
                onClick={(e) => e.stopPropagation()}>
                <MoreOutlined />
            </Button>
        </Dropdown>
    )
}

export default ActionMenu
