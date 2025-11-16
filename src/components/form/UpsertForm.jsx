import React from 'react'
import Form from '.'

const UpsertForm = ({ form, onFinish, initialValues = {}, fieldItems, submitting, onCancel, createAction, updateAction }) => {
  const handleSubmit = (formData) => {
    if (initialValues?.id) {
      updateAction?.(initialValues.id, formData)
    } else {
      createAction?.(formData)
    }

    onFinish?.(formData)
  }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      fieldItems={fieldItems}
      submitting={submitting}
      onCancel={onCancel}
    />
  )
}

export default UpsertForm
