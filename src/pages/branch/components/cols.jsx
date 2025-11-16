import React from 'react'
import { useTranslation } from 'react-i18next'
import Actions from '../../../components/form/button/Actions'
import useBranchRequest from '../../../requests/useBranchRequest'

export const branchCols = (onOpenUpsertModal) => {
  const { t } = useTranslation()
  const { updateBranchRequest } = useBranchRequest()

  return [
    {
      title: t('attributes.name'),
      dataIndex: 'name',
    },
    {
      title: t('attributes.address'),
      dataIndex: 'address',
    },
    {
      title: t('attributes.phone'),
      dataIndex: 'phone',
    },
    {
      title: t('action'),
      width: 150,
      className: 'container-action text-center',
      render: (_, row) => (
        <Actions
          editAction={() => onOpenUpsertModal(row)}
          status={row.status}
          onChangeStatus={(status) => updateBranchRequest(row.id, { ...row, status })}
        />
      ),
    },
  ]
}
