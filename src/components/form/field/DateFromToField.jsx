import React from 'react'
import { DatePicker, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { DMY_FORMAT } from '../../../config/constants'
import MdiIcon from '../../icon/MdiIcon'

const DateFromToField = ({ startName, endName, allowClear = false }) => {
  const { t } = useTranslation()

  return (
    <div className="flex lg-justify-end">
      <Form.Item
        className="mb-0 mr-0"
        name={startName}
      >
        <DatePicker
          format={DMY_FORMAT}
          placeholder={t('placeholders.select', { attr: t('attributes.date') })}
          allowClear={allowClear}
        />
      </Form.Item>
      <div className="flex items-center ml-2 mr-2">
        <MdiIcon name="mdiArrowRight" />
      </div>
      <Form.Item
        className="mb-0"
        name={endName}
      >
        <DatePicker
          format={DMY_FORMAT}
          placeholder={t('placeholders.select', { attr: t('attributes.date') })}
          allowClear={allowClear}
        />
      </Form.Item>
    </div>
  )
}

export default DateFromToField
