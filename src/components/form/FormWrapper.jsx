import React from 'react'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import lodash from 'lodash'
import { useTranslation } from 'react-i18next'
import { FORM_LAYOUT } from '../../config/constants'

const FormWrapper = ({ children, actionButtons, submitting, onCancel, ...props }) => {
  const { t } = useTranslation()
  const { saveActionLabel, saveActionIcon } = props
  props = lodash.omit(props, ['saveActionIcon', 'saveActionLabel'])

  return (
    <Form
      {...FORM_LAYOUT}
      {...props}
    >
      {children}

      <Form.Item className="mb-0">
        {actionButtons ?? (
          <>
            <Button
              type="primary"
              className="float-right ml-2"
              loading={submitting}
              htmlType="submit"
              icon={saveActionIcon ?? <SaveOutlined />}
            >
              {saveActionLabel ?? t('save')}
            </Button>
            <Button
              className="float-right"
              onClick={onCancel}
              icon={<CloseOutlined />}
            >
              {t('close')}
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  )
}

export default FormWrapper
