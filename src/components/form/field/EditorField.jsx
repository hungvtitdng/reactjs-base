import React from 'react'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import ReactQuill from 'react-quill-new'
import WrapperField from './Wrapper'

const commonModules = [
  [{ header: '1' }, { header: '2' }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
]

const expandedModules = [
  [{ indent: '-1' }, { indent: '+1' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
]

const getModules = (disabled = false) => ({
  toolbar: [
    ...commonModules,
    ...(disabled ? [] : expandedModules),
  ],
})

const EditorField = ({ required = true, isShowLable = true, ...props }) => {
  const { t } = useTranslation()

  return (
    <WrapperField {...props}>
      <Form.Item
        label={isShowLable && t(`attributes.${props.label ?? props.attribute}`)}
        name={props.attribute}
        rules={[{
          required,
          ...(props.ruleType && { type: props.ruleType }),
          message: t('messages.input', { attr: t(`attributes.${props.attribute}`) }),
        }]}
      >
        <ReactQuill readOnly={props.disabled} style={{ height: '200px' }} theme="snow" modules={getModules(props.disabled)} />
      </Form.Item>
    </WrapperField>
  )
}

export default EditorField
