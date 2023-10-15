import Layout, { Content, Header } from 'antd/es/layout/layout'
import Navbar from 'component/Navbar/Navbar.component'
import Sidebar from 'component/Sidebar/Sidebar.component'
import AuthenticatedAppRouter from 'component/routers/AuthenticatedAppRouter'
import React from 'react'

const AppContainer: React.FC = () => {
    return (
        <Layout className="app-container">
            <Header className="p-x-0">
                <Navbar />
            </Header>
            <Layout hasSider>
                <Sidebar />
                <Content className="main-content">
                    <AuthenticatedAppRouter />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AppContainer
