import React from 'react'
import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import Actions from '../../../components/form/button/Actions'
import useCategoryRequest from '../../../requests/useCategoryRequest'

export const categoryCols = (onOpenUpsertModal) => {
  const { t } = useTranslation()
  const { updateCategoryRequest, deleteCategoryRequest } = useCategoryRequest()

  return [
    {
      title: t('attributes.name'),
      dataIndex: 'name',
    },
    {
      title: t('attributes.icon'),
      dataIndex: 'icon',
    },
    {
      title: t('attributes.color'),
      dataIndex: 'color',
    },
    {
      title: t('attributes.category_type'),
      dataIndex: 'type',
      render: (val) => <Tag className="w-100px text-center">{t(`attributes.category_type_${val}`)}</Tag>,
    },
    {
      title: t('attributes.is_default'),
      dataIndex: 'is_default',
      render: (val) => <Tag className="w-100px text-center" color={`${val ? '#87d068' : '#f50'}`}>{t(`attributes.is_default_${val}`)}</Tag>,
    },
    {
      title: t('attributes.is_more_selected'),
      dataIndex: 'is_more_selected',
      render: (val) => <Tag className="w-100px text-center" color={`${val ? '#87d068' : '#f50'}`}>{t(`attributes.is_more_selected_${val}`)}</Tag>,
    },
    {
      title: t('attributes.is_chargeable'),
      dataIndex: 'is_chargeable',
      render: (val) => <Tag className="w-100px text-center" color={`${val ? '#87d068' : '#f50'}`}>{t(`attributes.is_chargeable_${val}`)}</Tag>,
    },
    {
      title: t('attributes.order'),
      dataIndex: 'order',
    },
    {
      title: t('action'),
      width: 160,
      className: 'container-action text-center',
      render: (_, row) => (
        <Actions
          editAction={() => onOpenUpsertModal(row)}
          status={row.status}
          onChangeStatus={(status) => updateCategoryRequest(row.id, { status })}
          onDelete={() => deleteCategoryRequest(row.id)}
        />
      ),
    },
  ]
}
