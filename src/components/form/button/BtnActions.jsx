import React from 'react'
import { Button, Tooltip } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MdiIcon from '../../icon/MdiIcon'

export const BtnAction = ({ active = true, pdSize = 2, title, color = 'blue', iconName, ...props }) => (
  <Tooltip title={title} color={color}>
    <Button
      type="link"
      {...props}
      className={`pl-${pdSize} pr-${pdSize} ${props.className}`}
      onClick={active ? props.onClick : null}
    >
      <MdiIcon name={iconName} className={active ? `color-${color}` : 'color-gray-light'} />
    </Button>
  </Tooltip>
)

export const BtnActionMini = ({ active = true, title, color = 'blue', iconName, ...props }) => (
  <Tooltip title={title} color={props.tooltipColor ?? (color === 'white' ? 'red' : color)}>
    <span className={`pointer btn-action-mini ${props.className}`} onClick={active ? props.onClick : null}>
      <MdiIcon name={iconName} className={`cursor-pointer color-${color}`} />
    </span>
  </Tooltip>
)

export const BtnActionLink = ({ pdSize = 2, title, to, color = 'blue', iconName, disabled }) => (
  <Tooltip title={title} color={color}>
    <Link to={to} className={`pl-${pdSize} pr-${pdSize} inline-block`}>
      <MdiIcon name={iconName} className={disabled ? 'color-gray-light' : `color-${color}`} />
    </Link>
  </Tooltip>
)

export const BtnView = ({ color = 'green', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={t('view-detail')}
      iconName="mdiEyeOutline"
      color={color}
      {...props}
    />
  )
}

export const BtnAdd = ({ color = 'blue', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={t('add')}
      iconName="mdiPlus"
      color={color}
      {...props}
    />
  )
}

export const BtnEditLink = ({ color = 'blue', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnActionLink
      title={t('update')}
      iconName="mdiPencilOutline"
      color={color}
      {...props}
    />
  )
}

export const BtnEdit = ({ color = 'blue', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={t('update')}
      iconName="mdiPencilOutline"
      color={color}
      {...props}
    />
  )
}

export const BtnDelete = ({ title, color = 'red', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={title ?? t('delete')}
      iconName="mdiWindowClose"
      color={color}
      {...props}
    />
  )
}

export const BtnCancelBooking = ({ title, color = 'red', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={title ?? t('cancel-booking')}
      iconName="mdiTrashCanOutline"
      color={color}
      {...props}
    />
  )
}

export const BtnCopy = ({ color = 'green', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={t('copy')}
      iconName="mdiContentCopy"
      color={color}
      {...props}
    />
  )
}

export const BtnFinish = ({ title, color = 'green', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={title ?? t('finish')}
      iconName="mdiCheckboxMarkedOutline"
      color={color}
      {...props}
    />
  )
}

export const BtnViewLog = ({ color = 'red', ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnAction
      title={t('view-log')}
      iconName="mdiFileQuestionOutline"
      color={color}
      {...props}
    />
  )
}

export const BtnSubmit = ({ name, btnColor = 'btn-green', ...props }) => (
  <Button
    {...props}
    type="primary"
    htmlType="submit"
    className={`flex items-center justify-center ${props.className} ${btnColor}`}
    onClick={props.disabled ? null : props.onClick}
  >
    {name}
  </Button>
)

export const BtnImportUsers = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <BtnSubmit
      name={t('import-users')}
      btnColor="btn-blue"
      icon={<UsergroupAddOutlined />}
      {...props}
    />
  )
}
