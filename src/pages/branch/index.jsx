import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import BtnCreate from '../../components/form/button/BtnCreate'
import TableComponent from '../../components/table'
import Content from '../../components/layout/Content'
import FormSearch from '../../components/form/SearchForm'
import useBranchRequest from '../../requests/useBranchRequest'
import { branchFields, branchSearchFields } from './components/fields'
import { branchCols } from './components/cols'
import useSelector from '../../store/modules/branch/useSelector'
import UpsertModal from '../../components/modal/UpsertModal'

const BranchPage = () => {
  const { t } = useTranslation()
  const { getListBranchRequest, createBranchRequest, updateBranchRequest } = useBranchRequest()
  const { loading, list, actionSuccess, submitting } = useSelector()

  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useState({})
  const [openUpsertModal, setOpenUpsertModal] = useState(false)
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    loadData(page, searchParams)
  }, [page, searchParams])

  useEffect(() => {
    if (actionSuccess) {
      setOpenUpsertModal(false)
      setPage(1)
      setSearchParams({})
    }
  }, [actionSuccess])

  const onSubmitSearch = (formData) => {
    setPage(1)
    loadData(1, formData)
  }

  const loadData = (nextPage, formData = {}) => {
    getListBranchRequest({
      ...formData,
      page: nextPage,
    })
  }

  const onCancel = () => {
    setOpenUpsertModal(false)
    setInitialValues({})
  }

  const onOpenUpsertModal = (formData = {}) => {
    setOpenUpsertModal(true)
    setInitialValues(formData)
  }

  return (
    <Content
      title={t('branches')}
      extra={<BtnCreate onClick={() => onOpenUpsertModal()} />}
      breadcrumbItems={[{
        title: t('branches'),
      }]}
    >
      <FormSearch
        onFinish={onSubmitSearch}
        items={branchSearchFields()}
      />

      <UpsertModal
        open={openUpsertModal}
        onCancel={onCancel}
        name={t('branch')}
        initialValues={initialValues}
        fieldItems={branchFields()}
        submitting={submitting}
        createAction={createBranchRequest}
        updateAction={updateBranchRequest}
      />

      <TableComponent
        loading={loading}
        columns={branchCols(onOpenUpsertModal)}
        data={list}
        onPageChange={(p) => setPage(p)}
      />
    </Content>
  )
}

export default BranchPage
