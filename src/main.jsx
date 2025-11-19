import 'antd/dist/reset.css'
import './assets/css/global.scss'
import './assets/css/main.scss'
import './assets/css/app.scss'
import './assets/css/v6.7.2-all.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './utils/history'
import { configure } from './store'
import AppRoutes from './components/application/AppRoutes'
import route from './routes'

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(
  <HelmetProvider>
    <Provider store={configure()}>
      <ConnectedRouter history={history}>
        <AppRoutes routes={route} />
      </ConnectedRouter>
    </Provider>
  </HelmetProvider>,
)
