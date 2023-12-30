import { StaffProvider } from 'Provider/StaffProvider'
import { Tabs, TabsProps } from 'antd'
import AdminTab from 'component/Staff/Department/AdminTab/AdminTab.component'
import DepartmentTab from 'component/Staff/Department/DepartmentTab/DepartmentTab.component'
import StaffTab from 'component/Staff/StaffTab/StaffTab.component'
import TabsLabel from 'component/TabsLabel/TabsLabel.component'
import APP_ROUTE from 'component/utils/router'
import { StaffTabs } from 'enums/common.enums'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const Staff = () => {
    const { t } = useTranslation()
    const { tab: activeTab = StaffTabs.ALL } = useParams()
    const navigate = useNavigate()

    const tabsItems: TabsProps['items'] = useMemo(
        () => [
            {
                label: (
                    <TabsLabel id={StaffTabs.ALL} name={t('label.all-staff')} />
                ),
                key: StaffTabs.ALL,
                children: <StaffTab />,
            },
            {
                label: (
                    <TabsLabel
                        id={StaffTabs.DEPARTMENT}
                        name={t('label.department')}
                    />
                ),
                key: StaffTabs.DEPARTMENT,
                children: <DepartmentTab />,
            },
            {
                label: (
                    <TabsLabel id={StaffTabs.ADMIN} name={t('label.admin')} />
                ),
                key: StaffTabs.ADMIN,
                children: <AdminTab />,
            },
        ],
        []
    )

    const handleTabChange = (activeKey: string) => {
        if (activeKey !== activeTab) {
            navigate(`${APP_ROUTE.STAFF}/${activeKey}`)
        }
    }

    return (
        <StaffProvider>
            <Tabs
                destroyInactiveTabPane
                activeKey={activeTab}
                className="tabs"
                data-testid="tabs"
                items={tabsItems}
                onChange={handleTabChange}
            />
        </StaffProvider>
    )
}

export default Staff
