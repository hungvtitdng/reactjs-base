import 'antd/dist/reset.css'
import '../../assets/css/global.scss'
import '../../assets/css/app.scss'

import React from 'react'
import { Layout } from 'antd'

const GuestLayout = ({ children }) => (
  <Layout className="min-h-screen">
    <Layout.Content className="min-h-screen">
      {children}
    </Layout.Content>
  </Layout>
)

export default GuestLayout
