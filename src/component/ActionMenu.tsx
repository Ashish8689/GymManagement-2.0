import React, { FC, ReactNode } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import _ from 'lodash'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { ClientData } from '../types'

interface ActionSet {
    type: string
}

interface OnClick {
    name: string
    data: ClientData
}

interface ActionMenu {
    data?: any
    items: ActionSet[]
    onClick?: ({ name, data }: OnClick) => void
}

interface MenuItems {
    icon: ReactNode
    text: string
}

interface defaultValues {
    [code: string]: MenuItems
}

const ActionMenu: FC<ActionMenu> = ({ data, items, onClick = _.noop }) => {
    const onDeactivate = (data: any): void => {
        console.log('onDeactivate')
    }

    const onActionClick = ({ key, domEvent }: MenuInfo): void => {
        domEvent.stopPropagation()
        const item = items[+key]
        switch (item.type) {
            case 'deactivate':
                onDeactivate(item)
                onClick({ name: item.type, data })

                break
            default:
                onClick({ name: item.type, data })

                break
        }
    }

    const menu = (
        <Menu>
            {items.map((item, index) => {
                const defaultValues: defaultValues = {
                    edit: {
                        icon: <EditOutlined />,
                        text: 'Edit',
                    },
                    deactivate: {
                        icon: <DeleteOutlined />,
                        text: 'Deactivate',
                    },
                }

                return (
                    <Menu.Item
                        icon={
                            defaultValues[item.type]?.icon || <EditOutlined />
                        }
                        key={index.toString()}
                        onClick={onActionClick}
                    >
                        {defaultValues[item.type]?.text || 'N/A'}
                    </Menu.Item>
                )
            })}
        </Menu>
    )

    return (
        <Dropdown
            overlay={menu}
            overlayStyle={{ minWidth: 150 }}
            trigger={['click']}
        >
            <Button
                size="small"
                type="text"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <MoreOutlined />
            </Button>
        </Dropdown>
    )
}

export default ActionMenu
