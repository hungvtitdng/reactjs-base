import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Title from '../../components/title'
import Flags from '../../components/layout/Flags'
import Loading from '../../components/modal/LoadingModal'

const Wrapper = ({ children, title, error = null, widthDefault }) => {
  const { t } = useTranslation()

  return (
    <>
      <Title name={title} />
      <Flags hasText className="absolute top-2 right-2" textClass={error === false ? 'color-white' : 'color-blue'} />

      {error === true && (
        <Result
          status="404"
          title="404"
          subTitle={t('messages.404')}
          extra={(
            <Link to="/">
              <Button type="primary">{t('login')}</Button>
            </Link>
          )}
        />
      )}

      {error === null && (
        <Loading />
      )}

      <div className="bg-main min-h-screen shadown-full pt-10%vh p-4 flex justify-center items-start min-h-screen">
        <div className={`bg-white p-4 pt-12 mt-10%vh ${widthDefault ?? 'w-96'}`}>
          <Flags hasText className="absolute top-2 right-2" textClass="color-white" />
          <div className="text-center p-4"><img alt="Logo" height="70" src="/assets/images/kid-time-logo.png" /></div>
          <h1 className="text-center mb-6 text-3xl color-main">{title}</h1>
          {children}
          <div className="text-center color-main pt-8">©2024 KidTime</div>
        </div>
      </div>
    </>
  )
}
export default Wrapper
