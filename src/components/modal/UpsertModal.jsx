import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '.'
import UpsertForm from '../form/UpsertForm'
import { MODAL_SIZE } from '../../config/constants'

const UpsertModal = ({
  form,
  top,
  name,
  displayField = 'name',
  open,
  onCancel,
  onFinish,
  initialValues,
  fieldItems,
  submitting,
  createAction,
  updateAction,
  width = MODAL_SIZE.MEDIUM,
}) => {
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setOpenModal(open)
  }, [open])

  const handleCancel = () => {
    setOpenModal(false)
    onCancel?.()
  }

  return (
    <Modal
      top={top}
      width={width}
      open={openModal}
      onCancel={handleCancel}
      title={initialValues?.id ? t('update-title', { s: name, t: initialValues?.[displayField]?.toString() }) : t('create-new-title', { s: name })}
    >
      <UpsertForm
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        fieldItems={fieldItems}
        submitting={submitting}
        onCancel={handleCancel}
        updateAction={updateAction}
        createAction={createAction}
      />
    </Modal>
  )
}

export default UpsertModal
