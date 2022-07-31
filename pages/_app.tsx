import { ReactNode } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
