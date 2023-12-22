import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.js'

dayjs.extend(weekday)
dayjs.extend(localeData)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
