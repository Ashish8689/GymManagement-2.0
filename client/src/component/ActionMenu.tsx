import React, { FC, ReactNode, Suspense, useState } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import _ from 'lodash'
import {
    DeleteOutlined,
    DollarCircleOutlined,
    EditOutlined,
    LoadingOutlined,
    MoreOutlined,
} from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { ClientData } from '../types/types'
import DeactivateModal from './componentModal/DeactivateModal'
import { CLIENT_MODAL_DATA } from '../constants/clients.constant'

interface ActionType {
    buttonLabel: string
    successMessage: string
    title: string
    value: string
}

interface ActionSet {
    type: string
    actionType: ActionType
}

interface OnClick {
    name: string
    data: ClientData
}

interface ActionMenuProps {
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

interface Deactivate {
    data: any
    actionType: ActionType
}

const ActionMenu: FC<ActionMenuProps> = ({ data, items, onClick = _.noop }) => {
    const [deActivateModalData, setDeActivateModalData] =
        useState(CLIENT_MODAL_DATA)

    const onDeactivate = ({ data, actionType }: Deactivate): void => {
        setDeActivateModalData({
            actionType: actionType,
            formData: data,
            visible: true,
        })
    }

    const onActionClick = ({ key, domEvent }: MenuInfo): void => {
        domEvent.stopPropagation()
        const item = items[+key]
        switch (item.type) {
            case 'deactivate':
                onDeactivate({
                    data,
                    actionType: item.actionType,
                })

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
                    subscribe: {
                        icon: <DollarCircleOutlined />,
                        text: 'Subscribe',
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
        <>
            <Suspense fallback={<LoadingOutlined />}>
                {/* modal for add/edit actions */}
                <DeactivateModal
                    actionType={{ ...deActivateModalData.actionType }}
                    formData={{ ...deActivateModalData.formData }}
                    open={deActivateModalData.visible}
                    onClose={() => setDeActivateModalData(CLIENT_MODAL_DATA)}
                />
            </Suspense>
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
        </>
    )
}

export default ActionMenu
