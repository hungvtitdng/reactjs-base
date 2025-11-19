import React, { useEffect } from 'react'
import { Form as AntForm, Row } from 'antd'
import dayjs from 'dayjs'
import lodash from 'lodash'
import { useTranslation } from 'react-i18next'

import FormWrapper from './FormWrapper'
import InputForm from './field/InputField'
import SelectField from './field/SelectField'
import DateTimeForm from './field/DateTimeField'
import { FIELD_TYPES, GUTTER, HM_FORMAT, HMS_FORMAT, YMD_FORMAT } from '../../config/constants'
import CheckboxGroupField from './field/CheckboxGroupField'
import TextareaField from './field/TextareaField'

const Form = ({ initialValues, onFinish, actionButtons, onCancel, fieldItems, submitting, form: externalForm, saveActionIcon, saveActionLabel, className }) => {
  const { t } = useTranslation()
  const [form] = externalForm ? [externalForm] : AntForm.useForm()

  useEffect(() => {
    if (lodash.isEmpty(initialValues)) {
      const defaultValues = fieldItems.reduce((acc, item) => {
        acc[item.attribute] = item.defaultValue
        return acc
      }, {})

      form.setFieldsValue(defaultValues)
    } else {
      const flattenedData = fieldItems.reduce((acc, item) => {
        acc[item.attribute] = lodash.get(initialValues, item.type === 'image' ? `${item.objName}.id` : (item.attr ?? item.attribute))

        if (item?.type === 'date' && acc[item.attribute]) {
          acc[item.attribute] = dayjs(acc[item.attribute])
        } else if (item?.type === 'time' && acc[item.attribute]) {
          acc[item.attribute] = dayjs(acc[item.attribute], HMS_FORMAT)
        }

        return acc
      }, {})

      form.setFieldsValue(flattenedData)
    }
  }, [JSON.stringify(initialValues)])

  const onUploadImage = (attribute, uploadData) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      [attribute]: uploadData.id,
    })
  }

  const onSubmit = (formData) => {
    const newFormData = Object.fromEntries(
      Object.entries(formData).map((item) => {
        if (typeof item[1] === 'object' && dayjs(item[1]).isValid()) {
          const _attrObj = fieldItems.find((i) => i.attribute === item[0])
          switch (_attrObj?.type) {
            case FIELD_TYPES.TIME:
              return [item[0], dayjs(item[1]).format(HM_FORMAT)]

            default:
              return [item[0], dayjs(item[1]).format(YMD_FORMAT)]
          }
        }

        return item
      }),
    )

    onFinish(newFormData)
  }

  return (
    <FormWrapper
      form={form}
      onFinish={onSubmit}
      actionButtons={actionButtons}
      onCancel={onCancel}
      submitting={submitting}
      saveActionIcon={saveActionIcon}
      saveActionLabel={saveActionLabel}
      className={className}
    >
      {fieldItems.reduce((acc, fi, index) => {
        if (fi.type === FIELD_TYPES.NEW_LINE) {
          acc.push(<Row gutter={GUTTER} key={`row-${index}`} />)
          return acc
        }

        let item = null

        switch (fi.type) {
          case FIELD_TYPES.DATE:
          case FIELD_TYPES.TIME:
            item = <DateTimeForm key={fi.attribute} {...fi} />
            break

          case FIELD_TYPES.CHECKBOX_MULTIPLE:
            item = <CheckboxGroupField key={fi.attribute} {...fi} />
            break

          case FIELD_TYPES.SELECT:
            item = <SelectField key={fi.attribute} {...fi} />
            break

          case FIELD_TYPES.TEXTAREA:
            item = <TextareaField key={fi.attribute} {...fi} />
            break

          default:
            item = <InputForm key={fi.attribute} {...fi} />
            break
        }

        if (acc.length === 0 || acc[acc.length - 1].type !== Row) {
          acc.push(<Row gutter={GUTTER} key={`row-${index}`}>{item}</Row>)
        } else {
          const lastRow = acc[acc.length - 1]
          const currentChildren = Array.isArray(lastRow.props.children) ? lastRow.props.children : [lastRow.props.children]
          acc[acc.length - 1] = React.cloneElement(lastRow, {}, [...currentChildren, item])
        }

        return acc
      }, [])}
    </FormWrapper>
  )
}

export default Form
