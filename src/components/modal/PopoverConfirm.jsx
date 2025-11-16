import React, { useState } from 'react'
import { Button, Flex, Popover } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const PopoverConfirm = ({ children, title, description, textFirstBtn, textSecondBtn, onFirstBtn, onSecondBtn }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  const onClickFirstBtn = () => {
    onClose()
    onFirstBtn()
  }

  const onClickSecondBtn = () => {
    onClose()
    onSecondBtn()
  }

  const content = (
    <div className="flex flex-col gap-2">
      <span className="pb-1">{description}</span>
      <Flex justify="flex-end" className="gap-2">
        <Button size="small" variant="solid" onClick={onClose}>{t('close')}</Button>
        <Button size="small" color="primary" variant="solid" onClick={onClickFirstBtn}>{textFirstBtn}</Button>
        {onSecondBtn && (
          <Button size="small" color="green" variant="solid" onClick={onClickSecondBtn}>{textSecondBtn}</Button>
        )}
      </Flex>
    </div>
  )

  return (
    <Popover
      content={content}
      title={<h4><ExclamationCircleFilled style={{ color: '#faad14' }} /> <strong className="pl-1">{title}</strong></h4>}
      trigger="click"
      open={open}
      onOpenChange={(visible) => setOpen(visible)}
    >
      {children}
    </Popover>
  )
}

export default PopoverConfirm
