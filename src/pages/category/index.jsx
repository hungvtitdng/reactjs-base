import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BtnCreate from '../../components/form/button/BtnCreate'
import TableComponent from '../../components/table'
import Content from '../../components/layout/Content'
import FormSearch from '../../components/form/SearchForm'
import useCategoryRequest from '../../requests/useCategoryRequest'
import { categoryCols } from './components/cols'
import { categoryFields, categorySearchFields } from './components/fields'
import useSelector from '../../store/modules/category/useSelector'
import UpsertModal from '../../components/modal/UpsertModal'

const CategoryPage = () => {
  const { t } = useTranslation()
  const { getListCategoryRequest, updateCategoryRequest, createCategoryRequest } = useCategoryRequest()

  const { loading, list, actionSuccess, submitting } = useSelector()

  const [page, setPage] = useState(1)
  const [openUpsertModal, setOpenUpsertModal] = useState(false)
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    loadData(page)
  }, [page])

  useEffect(() => {
    if (actionSuccess) {
      setOpenUpsertModal(false)
      setPage(1)
      loadData(1)
    }
  }, [actionSuccess])

  const onSubmitSearch = (formData) => {
    setPage(1)
    loadData(1, formData)
  }

  const loadData = (nextPage, formData = {}) => {
    getListCategoryRequest({
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
      title={t('categories')}
      extra={<BtnCreate onClick={() => onOpenUpsertModal()} />}
      breadcrumbItems={[{
        title: t('categories'),
      }]}
    >
      <FormSearch
        onFinish={onSubmitSearch}
        items={categorySearchFields()}
      />

      <UpsertModal
        open={openUpsertModal}
        onCancel={onCancel}
        name={t('category')}
        initialValues={initialValues}
        fieldItems={categoryFields()}
        submitting={submitting}
        createAction={createCategoryRequest}
        updateAction={updateCategoryRequest}
      />

      <TableComponent
        loading={loading}
        columns={categoryCols(onOpenUpsertModal)}
        data={list}
        onPageChange={(p) => setPage(p)}
      />
    </Content>
  )
}

export default CategoryPage
