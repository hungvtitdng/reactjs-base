import React, { useState, useEffect } from 'react'
import { Grid, Layout } from 'antd'
import { hasAuth } from '../../routes/permission'

import HeaderMain from './HeaderMain'
import SideBar from './SideBar'
// import useAuthRequest from '../../requests/useAuthRequest'
import FaIcon from '../icon/FaIcon'
import { COLORS } from '../../config/constants'

const { Content, Sider } = Layout
const { useBreakpoint } = Grid

const MainLayout = ({ children }) => {
  const screens = useBreakpoint()
  // const { syncRequest } = useAuthRequest()

  const [isCollapsed, setCollapsed] = useState(true)

  useEffect(() => {
    if (hasAuth()) {
      // syncRequest()
    }
  }, [])

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        theme="light"
        className="slider-bar"
      >
        <div className="flex h-screen flex-col">
          <div className="header-logo flex justify-center items-center flex-0-0-auto hide-20">
            <span className={`whitespace-nowrap ${isCollapsed ? 'fadeOut' : 'fadeIn'}`}>{import.meta.env.VITE_APP_NAME}</span>
            <span className={`md-hide ${isCollapsed ? 'fadeIn' : 'fadeOut'}`}><FaIcon className="fz-6" name="child-reaching" color={COLORS.WHITE} /></span>
          </div>
          <SideBar isCollapsed={isCollapsed} />
        </div>
      </Sider>
      <Layout className="flex h-screen">
        <HeaderMain isCollapsed={isCollapsed} onCollapse={() => setCollapsed(!isCollapsed)} />
        <Content className={`overflow-y-auto p-${screens.md ? 2 : 0}`}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
