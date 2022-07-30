import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Create Next App</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <h1>Hello to Gym Management 2.0</h1>
        </div>
    )
}

export default Home
