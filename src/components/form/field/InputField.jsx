import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import WrapperField from './Wrapper'
import { FIELD_TYPES } from '../../../config/constants'

const InputField = ({ required = true, isShowLable = true, ...props }) => {
  const { t } = useTranslation()

  const Field = props.type === FIELD_TYPES.PASSWORD ? Input.Password : Input

  return (
    <WrapperField {...props}>
      <Form.Item
        label={isShowLable && (props.label ?? t(`attributes.${props.attribute}`))}
        name={props.attribute}
        rules={[
          {
            required,
            ...(props.ruleType && { type: props.ruleType }),
            message: t('messages.input', { attr: t(`attributes.${props.attribute}`) }),
          },
          ...(props.otherRules ? props.otherRules : []),
        ]}
      >
        <Field
          allowClear={props.allowClear}
          size={props.size}
          placeholder={props.placeholder ?? t('placeholders.input', { attr: t(`attributes.${props.attribute}`) })}
        />
      </Form.Item>
    </WrapperField>
  )
}

export default InputField
