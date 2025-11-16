import React from 'react'
import { DatePicker, Form, TimePicker } from 'antd'
import { useTranslation } from 'react-i18next'
import { DMY_FORMAT, HM_FORMAT } from '../../../config/constants'
import Wrapper from './Wrapper'

const DateTimeField = ({ required = true, type = 'date', ...props }) => {
  const { t } = useTranslation()
  const PickerComponent = type === 'date' ? DatePicker : TimePicker

  return (
    <Wrapper {...props}>
      <Form.Item
        label={t(`attributes.${props.attribute}`)}
        name={props.attribute}
        rules={[{
          required,
          message: t('messages.select', { attr: t(`attributes.${props.attribute}`) }),
        }]}
      >
        <PickerComponent
          allowClear={props.allowClear}
          className="w-full"
          format={type === 'date' ? DMY_FORMAT : HM_FORMAT}
          placeholder={t('placeholders.select', { attr: t(`attributes.${props.attribute}`) })}
        />
      </Form.Item>
    </Wrapper>
  )
}

export default DateTimeField
