import React from 'react'
import { Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import Wrapper from './Wrapper'

const SelectField = ({ items = [], required = true, mode = null, isShowLable = true, ...props }) => {
  const { t } = useTranslation()

  return (
    <Wrapper {...props} className="cover-field">
      <Form.Item
        label={isShowLable && (props.label ?? t(`attributes.${props.attribute}`))}
        name={props.attribute}
        getValueFromEvent={(value) => (value === undefined ? null : value)}
        rules={[{
          required,
          message: t('messages.select', { attr: t(`attributes.${props.attribute}`) }),
        }]}
      >
        <Select
          showSearch
          mode={mode}
          disabled={props.disabled}
          onChange={props.onChange}
          allowClear={props.allowClear}
          tokenSeparators={props.tokenSeparators}
          placeholder={props.placeholder ?? t('placeholders.select', { attr: t(`attributes.${props.attribute}`) })}
        >
          {items?.map((i, index) => (
            <Select.Option key={`${i.value}-${index}`} value={i.value}>{i.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Wrapper>
  )
}

export default SelectField
