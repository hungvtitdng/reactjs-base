import React, { memo } from 'react'
import { Layout, Dropdown, Menu } from 'antd'
import { useTranslation } from 'react-i18next'

import MdiIcon from '../icon/MdiIcon'
import Flags from './Flags'
import useAuthRequest from '../../requests/useAuthRequest'
import Avatar from '../../pages/wrap/Avatar'
import { COLORS } from '../../config/constants'
import authStore from '../../store/modules/auth'
import { convertMenuItems, convertDropdownMenuItems } from '../../utils/helpers'

const MenuIcon = ({ isCollapsed, onCollapse }) => {
  const name = isCollapsed ? 'mdiMenu' : 'mdiMenuOpen'

  return (
    <MdiIcon
      color={COLORS.WHITE}
      name={name}
      size={1}
      className="ml-2 pointer"
      onClick={onCollapse}
    />
  )
}

const HeaderMain = ({ isCollapsed, onCollapse }) => {
  const { t } = useTranslation()
  const { logoutRequest } = useAuthRequest()
  const { user: authUser } = authStore.useSelector()

  const onLogout = () => {
    logoutRequest()
  }

  const menuItems = [
    {
      onClick: '/profiles',
      iconName: 'mdiAccountOutline',
      label: 'profile',
    },
    {
      onClick: '/change-password',
      iconName: 'mdiShieldKeyOutline',
      label: 'change-password',
    },
    { type: 'divider' },
    {
      onClick: onLogout,
      iconName: 'mdiLogout',
      iconColor: COLORS.RED_LIGHT,
      label: 'logout',
    },
  ]

  const headerMenuItems = [
    {
      key: '/',
      label: 'turnkey',
      icon: 'layer-group',
    },
    {
      key: '2',
      label: 'employee_portal',
      icon: 'users-cog',
    },
    {
      key: '3',
      label: 'client_portal',
      icon: 'users',
    },
  ]

  const items = convertDropdownMenuItems(menuItems, t)

  return (
    <Layout.Header>
      <div className="flex items-center">
        <MenuIcon isCollapsed={isCollapsed} onCollapse={onCollapse} />
        <Menu
          mode="horizontal"
          className="ml-6"
          defaultSelectedKeys={['1']}
          items={convertMenuItems(headerMenuItems, authUser, t)}
          disabledOverflow
        />
      </div>
      <div className="flex justify-end items-center mr-4">
        <Dropdown placement="bottomRight" menu={{ items }} trigger={['click']}>
          <div className="flex items-center pointer relative pl-3 h-full">
            <span className="fz-4 pr-2 md-hide">{authUser?.last_name} {authUser?.first_name}</span>
            <Avatar path={authUser?.avatar?.upload_path} />
          </div>
        </Dropdown>
        <Flags />
      </div>
    </Layout.Header>
  )
}

export default memo(HeaderMain)
