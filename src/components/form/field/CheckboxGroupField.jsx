import React from 'react'
import { Checkbox, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import WrapperField from './Wrapper'

const CheckboxMultipleField = ({ required = true, disabled, ...props }) => {
  const { t } = useTranslation()

  return (
    <WrapperField {...props}>
      <Form.Item
        label={t(`attributes.${props.attribute}`)}
        name={props.attribute}
        rules={[{
          required,
          message: t('messages.select', { attr: t(`attributes.${props.attribute}`) }),
        }]}
      >
        <Checkbox.Group disabled={disabled}>
          {props.items?.map((i) => (
            <Checkbox key={i.value} value={i.value}>
              {i.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </WrapperField>
  )
}

export default CheckboxMultipleField
