import { Button, Dropdown } from 'antd'
import { isFunction, noop } from 'lodash'
import { MenuInfo } from 'rc-menu/lib/interface'
import { FC, useCallback, useMemo } from 'react'

import {
    ACTION_TYPE,
    actionMenuDefaultValues,
} from 'constants/action.constants'
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg'
import ModalUtil from '../ModalUtil'
import DeactivateModal from '../componentModal/deactivate/DeactivateModal'
import { ActionMenuItems, ActionMenuProps } from './ActionMenu.interface'

const ActionMenu: FC<ActionMenuProps> = ({
    id,
    items,
    entity,
    onClick = noop,
}) => {
    const onDeactivate = (
        id: string,
        actionType: ACTION_TYPE,
        api: (id: string) => Promise<void>
    ): void => {
        ModalUtil.show({
            content: (
                <DeactivateModal
                    actionType={actionType}
                    api={api}
                    entity={entity}
                    id={id}
                />
            ),
        })
    }

    const onActionClick = useCallback(
        ({ key }: MenuInfo): void => {
            const actionItem = items.find((item) => item.type === key)

            if (actionItem) {
                switch (key) {
                    case ACTION_TYPE.DELETE:
                    case ACTION_TYPE.DE_ACTIVATE:
                        isFunction(actionItem.api) &&
                            onDeactivate(id, actionItem.type, actionItem.api)

                        break
                    default:
                        onClick(actionItem.type)

                        break
                }
            }
        },
        [items, onClick, onDeactivate]
    )

    const menuItems = useMemo(
        (): ActionMenuItems[] =>
            items.map((item) => {
                const option = actionMenuDefaultValues[item.type]

                return {
                    label: option.label,
                    icon: option.icon,
                    key: item.type,
                    onClick: onActionClick,
                }
            }),
        [items, onActionClick]
    )

    return (
        <Dropdown
            destroyPopupOnHide
            align={{ targetOffset: [-12, 0] }}
            menu={{ items: menuItems }}
            overlayStyle={{ width: '160px' }}
            placement="bottomRight"
            trigger={['click']}>
            <Button size="small" type="link">
                <MenuIcon height={14} width={14} />
            </Button>
        </Dropdown>
    )
}

export default ActionMenu
