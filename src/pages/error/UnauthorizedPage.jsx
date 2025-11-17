import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getAccessToken } from '../../utils/helpers'
import LoadingModal from '../../components/modal/LoadingModal'
import Title from '../../components/title'
import authStore from '../../store/modules/auth'

const UnauthorizedPage = () => {
  const { t } = useTranslation()
  const { user: authUser } = authStore.useSelector()

  return (
    (getAccessToken() && !authUser) ? (
      <>
        <Title name={t('loading')} />
        <LoadingModal visiable />
      </>
    ) : (
      <>
        <Title name={t('message.401')} />
        <Result
          status="404"
          title="404"
          subTitle={t('message.401')}
          extra={(
            <Link to="/">
              <Button type="primary">{t('back-home')}</Button>
            </Link>
          )}
        />
      </>
    )
  )
}

export default UnauthorizedPage
