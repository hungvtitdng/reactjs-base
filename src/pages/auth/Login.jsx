import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Wrapper from '../wrap/Wrapper'
import useAuthRequest from '../../requests/useAuthRequest'
import Form from '../../components/form'
import { loginFields } from './components/fields'
import useSelector from '../../store/modules/auth/useSelector'

const LoginPage = () => {
  const { t } = useTranslation()
  const { loginRequest } = useAuthRequest()
  const { submitting } = useSelector()

  const onFinishLogin = (values) => {
    loginRequest(values)
  }

  return (
    <Wrapper title={t('login')}>
      <Form
        onFinish={onFinishLogin}
        submitting={submitting}
        fieldItems={loginFields()}
        className="p-4"
        actionButtons={(
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={submitting}
          >
            {t('login')}
          </Button>
        )}
      />

      <div className="text-center color-gray mt-2">
        <Link className="no-underline color-main" to="/forgot-password">{t('forgot-password')}</Link>
      </div>
    </Wrapper>
  )
}

export default LoginPage
