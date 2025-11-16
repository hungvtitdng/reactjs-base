import { useTranslation } from 'react-i18next'
import { FIELD_TYPES } from '../../../config/constants'

export const categoryFields = () => {
  const { t } = useTranslation()

  return [
    {
      attribute: 'name',
      md: 12,
    },
    {
      attribute: 'order',
      label: t('attributes.order'),
      type: FIELD_TYPES.NUMBER,
      md: 12,
    },
  ]
}

export const categorySearchFields = () => [
  {
    attribute: 'name',
    md: 21,
  },
]
