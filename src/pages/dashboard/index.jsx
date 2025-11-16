import React from 'react'
import { useTranslation } from 'react-i18next'
import Content from '../../components/layout/Content'

const DashboardPage = () => {
  const { t } = useTranslation()

  return (
    <Content
      title={t('dashboard')}
      breadcrumbItems={[]}
    >
      KidTime
    </Content>
  )
}

export default DashboardPage
