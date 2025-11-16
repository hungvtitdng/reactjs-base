import React from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const UploadPlaceholder = ({ width }) => {
  const { t } = useTranslation()

  return (
    <div className="ant-upload-wrapper">
      <div className="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </div>
      <span className={`ant-upload-text${width < 200 ? '' : '-big'}`}>{t('messages.upload-text')}</span>
      <p className={`ant-upload-hint${width < 200 ? '' : '-big'}`}>{t('messages.upload-hint')}</p>
    </div>
  )
}

export default UploadPlaceholder
