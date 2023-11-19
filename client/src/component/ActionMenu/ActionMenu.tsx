import { Button, Dropdown } from 'antd'
import { isFunction, noop } from 'lodash'
import { MenuInfo } from 'rc-menu/lib/interface'
import { FC, useMemo } from 'react'

import {
    ACTION_TYPE,
    actionMenuDefaultValues,
} from 'constants/action.constants'
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg'
import { ActionType } from '../../interface/action.interface'
import ModalUtil from '../ModalUtil'
import DeactivateModal from '../componentModal/deactivate/DeactivateModal'
import { ActionMenuItems, ActionMenuProps } from './ActionMenu.interface'

const ActionMenu: FC<ActionMenuProps> = ({
    id,
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

    const onActionClick = ({ key }: MenuInfo): void => {
        const item = items.find((item) => item.type === key)

        if (item) {
            switch (key) {
                case ACTION_TYPE.DE_ACTIVATE:
                    isFunction(item.api) &&
                        onDeactivate(id, item.actionType, item.api)

                    break
                default:
                    onClick(item.type)

                    break
            }
        }
    }

    const menuItems = useMemo(
        (): ActionMenuItems[] =>
            items.map((item) => ({
                label: actionMenuDefaultValues[item.type].text,
                icon: actionMenuDefaultValues[item.type].icon,
                key: item.type,
                onClick: onActionClick,
            })),
        []
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
