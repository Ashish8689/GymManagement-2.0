import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Navbar from 'component/Navbar/Navbar.component'
import Sidebar from 'component/Sidebar/Sidebar.component'
import AuthenticatedAppRouter from 'component/routers/AuthenticatedAppRouter'
import './app-container.less'

const AppContainer: React.FC = () => {
    return (
        <Layout className="app-container">
            <Navbar />
            <Layout hasSider>
                <Sidebar />
                <Layout>
                    <Content className="main-content">
                        <AuthenticatedAppRouter />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default AppContainer
