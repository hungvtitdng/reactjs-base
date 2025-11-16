import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

const BtnCreate = ({ className, disabled, onClick }) => {
  const { t } = useTranslation()

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <PlusOutlined /> {t('create')}
    </Button>
  )
}

export default BtnCreate
