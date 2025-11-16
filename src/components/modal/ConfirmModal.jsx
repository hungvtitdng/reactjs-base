import React from 'react'
import { Modal, Button, Grid } from 'antd'
import { useTranslation } from 'react-i18next'
import AntIcon from '../icon/AntIcon'
import { COLORS } from '../../config/constants'

const { useBreakpoint } = Grid

const ConfirmModal = ({
  children,
  onCancel,
  onOk,
  onOk2,
  textOk,
  textOk2,
  okLoading = false,
  ok2Loading = false,
  color2,
  size = 'middle',
  ...props
}) => {
  const { t } = useTranslation()
  const screens = useBreakpoint()

  return (
    <Modal
      onOk={onOk}
      onCancel={onCancel}
      {...props}
      title={(
        <div className="flex items-center gap-2">
          <AntIcon name="ExclamationCircleOutlined" color={COLORS.ORANGE} size={24} />
          <span className="fz-6">
            {props.title}
          </span>
        </div>
      )}
      footer={[
        <Button
          key="close"
          size={screens.xs ? 'small' : size}
          icon={<AntIcon name="CloseOutlined" />}
          onClick={onCancel}
        >
          {t('close')}
        </Button>,
        onOk2 && (
          <Button
            key="delete"
            size={screens.xs ? 'small' : size}
            icon={<AntIcon name={color2 ?? 'DeleteOutlined'} />}
            color={color2 ?? 'danger'}
            variant="solid"
            loading={ok2Loading}
            onClick={onOk2}
          >
            {textOk2}
          </Button>
        ),
        <Button
          key="ok"
          size={screens.xs ? 'small' : size}
          icon={<AntIcon name="RollbackOutlined" />}
          color="primary"
          variant="solid"
          loading={okLoading}
          onClick={onOk}
        >
          {textOk}
        </Button>,
      ].filter(Boolean)}
    >
      {children}
    </Modal>
  )
}

export default ConfirmModal
