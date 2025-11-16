import React from 'react'
import lodash from 'lodash'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import FaIcon from '../../icon/FaIcon'

const InputSearch = ({ onFinish, ...props }) => {
  const { t } = useTranslation()

  const onSearch = lodash.debounce((value) => {
    onFinish(value)
  }, 500)

  return (
    <Input
      allowClear
      prefix={<FaIcon name="magnifying-glass" />}
      placeholder={t('input-search')}
      {...props}
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}

export default InputSearch
