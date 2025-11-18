import React from 'react'
import { notification } from 'antd'
import dayjs from 'dayjs'

import history from './history'
import {
  STORAGE_KEYS,
  PAGE_SIZE,
  DMY_FORMAT,
  YMD_FORMAT,
} from '../config/constants'
import { hasPer } from '../routes/permission'
import MdiIcon from '../components/icon/MdiIcon'

export const setToken = (accessToken) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
}

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
}

export const deleteStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
}

export const logout = () => {
  deleteStorage()
  history.push('/login')
}

export const notifySucess = (message) => {
  notification.success({ message, duration: 1.5 })
}

export const notifyError = (message) => {
  notification.error({ message, duration: 3 })
}

export const setIndexTableRow = (index, page) => {
  return (page - 1) * PAGE_SIZE + index + 1
}

export const toNumber = (num) => {
  if (num === null || num === undefined) {
    return 0
  }

  return parseFloat(num)
}

export const formatNumber = (num, isDash = false, char = 'K') => {
  if (num === null || num === undefined || (isDash && parseInt(num) === 0)) {
    return isDash ? '-' : 0
  }

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + char
}

export const mapToOptions = (items = [], label = 'name') => {
  if (!Array.isArray(items)) return []

  return items?.map((i) => ({
    value: i.id,
    label: typeof label === 'function' ? label(i) : i[label],
  }))
}

export const dateFormat = (date, format = DMY_FORMAT) => {
  if (!date) {
    return '-'
  }

  return dayjs(date).format(format)
}

export const dateServerFormat = (date) => {
  if (!date) {
    return null
  }

  return dayjs(date).format(YMD_FORMAT)
}

export const mapConstToOptions = (constItems, t, attr) => {
  return Object.values(constItems).map((value) => ({
    value,
    label: t(`attributes.${attr}_${value}`),
  }))
}

export const convertMenuItems = (items, authUser, t) => {
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
          children: convertMenuItems(item.children, authUser, t),
        }
      }

      return {
        ...rest,
        label: t(`menus.${item.label.toLowerCase()}`),
        icon: <i className={`fa-solid fa-${item.icon}`} />,
      }
    })
}

/**
 * Convert dropdown menu items from simple format to Ant Design Menu format
 *
 * @param {Array} items - Array of menu items with format:
 *   {
 *     onClick: function or string (path),
 *     iconName: string (MdiIcon name),
 *     iconColor: string (optional),
 *     label: string (translation key),
 *     type: string (optional, e.g., 'divider'),
 *     key: string (optional, auto-generated if not provided)
 *   }
 * @param {Function} t - Translation function
 * @returns {Array} - Converted menu items for Ant Design Menu
 *
 * @example
 * const menuItems = [
 *   {
 *     onClick: '/profiles',
 *     iconName: 'mdiAccountOutline',
 *     label: 'profile',
 *   },
 *   {
 *     onClick: onLogout,
 *     iconName: 'mdiLogout',
 *     iconColor: COLORS.RED_LIGHT,
 *     label: 'logout',
 *   },
 *   { type: 'divider' },
 * ]
 *
 * const items = convertDropdownMenuItems(menuItems, t)
 */
export const convertDropdownMenuItems = (items, t) => {
  return items.map((item, index) => {
    // Handle divider
    if (item.type === 'divider') {
      return { type: 'divider' }
    }

    // Generate key if not provided
    const key = item.key || `menu-item-${index + 1}`

    // Handle onClick - can be function or string (path)
    const handleClick = () => {
      if (typeof item.onClick === 'function') {
        item.onClick()
      } else if (typeof item.onClick === 'string') {
        history.push(item.onClick)
      }
    }

    // Build label with icon and text
    const label = (
      <div className="flex items-center" onClick={handleClick}>
        <MdiIcon name={item.iconName} color={item.iconColor} />
        <span className="pl-4">{t(item.label)}</span>
      </div>
    )

    return {
      key,
      className: 'pt-3 pb-3',
      label,
    }
  })
}
