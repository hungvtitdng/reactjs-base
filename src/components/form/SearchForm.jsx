import React from 'react'
import { Button, Col, Form, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { FIELD_TYPES, GUTTER } from '../../config/constants'
import SelectForm from './field/SelectField'
import InputForm from './field/InputField'
import DateTimeField from './field/DateTimeField'

const SearchForm = ({ items, onFinish, isShowLable = true, mdBtn = 3, submitting, form, initialValues }) => {
  const { t } = useTranslation()

  return (
    <Form
      form={form}
      layout="vertical"
      className={`${isShowLable && 'form-search'}`}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Row gutter={GUTTER}>
        {items?.map((fi) => {
          let Field

          switch (fi.type) {
            case FIELD_TYPES.SELECT:
              Field = SelectForm
              break

            case FIELD_TYPES.DATE:
              Field = DateTimeField
              break

            default:
              Field = InputForm
              break
          }

          return (
            <Field
              key={fi.attribute}
              isShowLable={isShowLable}
              required={false}
              {...fi}
            />
          )
        })}

        <Col xs={24} sm={24} md={mdBtn}>
          <Button
            loading={submitting}
            type="primary"
            htmlType="submit"
            className="btn btn-main w-full"
            icon={<SearchOutlined />}
          >
            {t('search')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
