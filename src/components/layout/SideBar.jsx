import React from 'react'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'

import history from '../../utils/history'
import { USER_ROLES } from '../../config/constants'
import { hasPer } from '../../routes/permission'
import authStore from '../../store/modules/auth'

const menuItems = [
  {
    key: '/',
    label: 'dashboard',
    icon: 'chart-simple',
  },
  {
    key: '/settings',
    label: 'Settings',
    icon: 'gear',
    permission: USER_ROLES.ROLE_MANAGER,
    children: [
      {
        key: '/settings/categories',
        label: 'categories',
        icon: 'coins',
        permission: USER_ROLES.ROLE_DIRECTOR,
      },
      {
        key: '/settings/branches',
        label: 'branches',
        icon: 'leaf',
        permission: USER_ROLES.ROLE_EMPLOYEE,
      },
    ],
  },
]

const SideBar = ({ isCollapsed }) => {
  const { t } = useTranslation()
  const { user: authUser } = authStore.useSelector()

  // Function để xác định active menu keys (cả parent và child)
  const getActiveMenuKeys = () => {
    const pathname = window.location.pathname

    // Tìm item matching với pathname trong menuItems constant
    const findMatchingItem = (items, parentKey = null) => {
      let result = null
      items.some((item) => {
        // Check exact match
        if (item.key === pathname) {
          result = parentKey ? [parentKey, item.key] : [item.key]
          return true
        }

        // Check children
        if (item.children) {
          const childMatch = findMatchingItem(item.children, item.key)
          if (childMatch) {
            result = childMatch
            return true
          }
        }
        return false
      })
      return result
    }

    const activeSelectedKeys = findMatchingItem(menuItems) || ['/']

    // Determine openKeys based on activeSelectedKeys
    const activeOpenKeys = activeSelectedKeys.length > 1 ? [activeSelectedKeys[0]] : []

    return { selectedKeys: activeSelectedKeys, openKeys: activeOpenKeys }
  }

  // Get active menu keys
  const activeMenuKeys = getActiveMenuKeys()

  const convertMenuItems = (items) => {
    return items
      .filter((item) => {
        if (!item.permission || !authUser?.roles) {
          return true
        }

        return hasPer(authUser?.roles, item.permission, item.isExact)
      })
      .map((item) => {
        const { isExact, ...rest } = item

        if (item.children) {
          return {
            ...rest,
            label: t(`menus.${item.label.toLowerCase()}`),
            icon: <i className={`fa-solid fa-${item.icon}`} />,
            children: convertMenuItems(item.children),
          }
        }

        return {
          ...rest,
          label: t(`menus.${item.label.toLowerCase()}`),
          icon: <i className={`fa-solid fa-${item.icon}`} />,
        }
      })
  }

  const items = convertMenuItems(menuItems)

  const onClickMenuItem = ({ key }) => {
    history.push(key)
  }

  return (
    <Menu
      className="overflow-y-auto hidden-scrollbar border-r-0 hide-05"
      mode="inline"
      defaultSelectedKeys={activeMenuKeys.selectedKeys}
      defaultOpenKeys={isCollapsed ? [] : activeMenuKeys.openKeys}
      items={items}
      onClick={onClickMenuItem}
    />
  )
}

export default SideBar
