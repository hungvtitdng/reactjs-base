import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import viVN from './lang/vi-VN'
import enUS from './lang/en-US'

export const getShortChar = () => {
  const [code] = i18n.language.split('-')

  return code
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'vi-VN': {
        translation: viVN,
      },
      'en-US': {
        translation: enUS,
      },
    },
    fallbackLng: 'vi-VN', // use en if detected lng is not available
    lng: 'vi-VN',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format(value, format) {
        if (!value) {
          return null
        }

        if (format === 'lowercase') {
          return value.toLowerCase()
        }

        return value
      },
    },
  })

export default i18n
