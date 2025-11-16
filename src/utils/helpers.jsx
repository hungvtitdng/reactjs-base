import { notification } from 'antd'
import dayjs from 'dayjs'

import history from './history'
import {
  STORAGE_KEYS,
  PAGE_SIZE,
  DMY_FORMAT,
  YMD_FORMAT,
} from '../config/constants'

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
