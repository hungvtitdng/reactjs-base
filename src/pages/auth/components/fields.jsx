import { useTranslation } from 'react-i18next'
import { FIELD_TYPES } from '../../../config/constants'

const getCommonFields = () => ({
  email: {
    attribute: 'email',
    isShowLable: false,
    size: 'large',
  },
  password: {
    attribute: 'password',
    isShowLable: false,
    type: FIELD_TYPES.PASSWORD,
    size: 'large',
  },
})

export const loginFields = () => {
  const commonFields = getCommonFields()

  return [
    commonFields.email,
    commonFields.password,
  ]
}

export const forgotPasswordFields = () => {
  const commonFields = getCommonFields()

  return [
    commonFields.email,
  ]
}

export const resetPasswordFields = () => {
  const { t } = useTranslation()
  const commonFields = getCommonFields()

  return [
    commonFields.password,
    {
      attribute: 'confirm_password',
      type: FIELD_TYPES.PASSWORD,
      size: 'large',
      otherRules: [
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }

            return Promise.reject(new Error(t('messages.confirm-new-password')))
          },
        }),
      ],
    },
  ]
}
