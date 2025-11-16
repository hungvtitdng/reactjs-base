import React from 'react'
import { Layout } from 'antd'

const Footer = () => <Layout.Footer>{import.meta.env.VITE_APP_NAME}</Layout.Footer>

export default Footer
