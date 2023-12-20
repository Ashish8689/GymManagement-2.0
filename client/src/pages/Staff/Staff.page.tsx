import { Tabs, TabsProps } from 'antd'
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
        ],
        []
    )

    const handleTabChange = (activeKey: string) => {
        if (activeKey !== activeTab) {
            navigate(`${APP_ROUTE.STAFF}/${activeKey}`)
        }
    }

    return (
        <div>
            <Tabs
                destroyInactiveTabPane
                activeKey={activeTab}
                className="tabs"
                data-testid="tabs"
                items={tabsItems}
                onChange={handleTabChange}
            />
        </div>
    )
}

export default Staff
