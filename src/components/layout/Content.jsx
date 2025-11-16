import React from 'react'
import { Breadcrumb, Col, Grid, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import Title from '../title'
import Loading from '../modal/LoadingModal'
import BreadcrumbTitle from '../../pages/wrap/BreadscumbTitle'

const { useBreakpoint } = Grid

const Content = ({ children, className, hasHeader = true, loading, headerTitle, title, breadcrumbItems, titleClassName, extra, forceTitle = false }) => {
  const { t } = useTranslation()
  const screens = useBreakpoint()

  return (
    <div className={`pl-2 pr-2 ${className}`}>
      <Loading visible={loading} />
      <Title name={title} />

      {hasHeader && (
        <Row className="pt-1 pb-2 md-w-full">
          <Col sm={24} md={extra ? 16 : 24} className={`${forceTitle ? '' : 'md-hide'} md-w-full fz-5 bold flex items-center ${titleClassName}`} style={{ height: '31px' }}>
            {headerTitle ?? (breadcrumbItems ? (
              <Breadcrumb
                items={[
                  {
                    title: <BreadcrumbTitle name={t('home')} iconName="home" />,
                  },
                  ...breadcrumbItems,
                ].filter(Boolean)}
              />
            ) : null)}
          </Col>
          <Col sm={24} md={8} className="flex justify-end md-w-full">
            {extra}
          </Col>
        </Row>
      )}

      <div className={`bg-white p-${screens.md ? 4 : 2}`}>
        {children}
      </div>
    </div>
  )
}

export default Content
