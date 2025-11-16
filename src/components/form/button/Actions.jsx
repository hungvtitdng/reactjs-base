import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { BtnDelete, BtnEditLink, BtnEdit, BtnAction } from './BtnActions'
import { STATUS } from '../../../config/constants'

const Actions = ({ status, statusActive, statusInActive, onChangeStatus, editLink, editAction, onDelete }) => {
  const { t } = useTranslation()

  const confirmDelete = () => {
    Modal.confirm({
      title: t('messages.confirm-delete'),
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        onDelete()
      },
    })
  }

  const confirmTrigger = () => {
    const title = status === STATUS.INACTIVE ? t('enable') : t('disable')

    Modal.confirm({
      title: t('messages.confirm-trigger', { s: title }),
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        const active = statusActive ?? STATUS.ACTIVE
        const inActive = statusInActive === undefined ? STATUS.INACTIVE : statusInActive

        const newStatus = status === active ? inActive : active
        onChangeStatus(newStatus)
      },
    })
  }

  return (
    <>
      {status === undefined ? null : (
        (statusActive ? status === statusActive : status) ? (
          <BtnAction
            title={t('disable')}
            iconName="mdiCheckAll"
            color="orange"
            onClick={confirmTrigger}
          />
        ) : (
          <BtnAction
            title={t('enable')}
            iconName="mdiCloseOctagonOutline"
            color="red"
            onClick={confirmTrigger}
          />
        )
      )}

      {editLink && <BtnEditLink to={editLink} />}
      {editAction && <BtnEdit onClick={editAction} />}
      {onDelete instanceof Function ? <BtnDelete onClick={confirmDelete} /> : null}
    </>
  )
}

export default Actions
