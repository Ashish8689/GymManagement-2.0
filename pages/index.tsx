import React from 'react'
import Head from 'next/head'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import type { NextPage } from 'next'
import 'antd/dist/antd.css'
import Sider from 'antd/lib/layout/Sider'
import Image from 'next/image'
import { UserAddOutlined } from '@ant-design/icons'

const Home: NextPage = () => {

    const SIDEBAR_LIST = [
        {
            key:1,
            label:"Dashboard",
            route:'/',
            icon: <UserAddOutlined />
        },{
            key:2,
            label:"Add Clients",
            route:'/',
            icon: <UserAddOutlined />
        },{
            key:3,
            label:"Clients",
            route:'/',
            icon: <UserAddOutlined />
        },{
            key:4,
            label:"Add Trainers",
            route:'/',
            icon: <UserAddOutlined />
        },{
            key:5,
            label:"Trainers",
            route:'/',
            icon: <UserAddOutlined />
        },{
            key:6,
            label:"Gyms",
            route:'/',
            icon: <UserAddOutlined />
        }
    ]

    return (
        <div className='bg-body'>
            <Head>
                <title>Gym Management</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <Layout id="app">
                <Header className='header' >
                    <div className="w-24 h-full flex justify-center items-center">
                        <Image  alt="Gym Management" height={50} src="/images/logo.png" width={50} />
                    </div>
                </Header>

                <Sider className='sidebar'>
                    <Menu
                        className='bg-bold-light text-white border-0'
                        defaultSelectedKeys={['1']}
                        items={SIDEBAR_LIST}
                        mode="inline"
                    />
                </Sider>
                <Layout className="site-layout">
                    <Content className='bg-bold-light m-4 mt-20 overflow-auto rounded-xl'
                    >
                        <div className="p-6" >
                            <p className='text-white'>long content</p>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Home
