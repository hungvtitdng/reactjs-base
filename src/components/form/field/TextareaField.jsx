import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import WrapperField from './Wrapper'

const TextareaField = ({ ruleType = 'string', required = true, ...props }) => {
  const { t } = useTranslation()

  return (
    <WrapperField {...props}>
      <Form.Item
        label={t(`attributes.${props.attribute}`)}
        name={props.attribute}
        rules={[{
          required,
          type: ruleType,
          message: t('messages.input', { attr: t(`attributes.${props.attribute}`) }),
        }]}
      >
        <Input.TextArea rows={props.row ?? 3} placeholder={t('placeholders.input', { attr: t(`attributes.${props.attribute}`) })} />
      </Form.Item>
    </WrapperField>
  )
}

export default TextareaField
