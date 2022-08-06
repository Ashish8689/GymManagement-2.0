import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'

const Home: NextPage = () => {
    return (
        <div className="bg-body">
            <Head>
                <title>Gym Management</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <div className="text-white">Hello for Dashboard</div>
        </div>
    )
}

export default Home
