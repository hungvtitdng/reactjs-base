import React from 'react'
import { Dropdown } from 'antd'
import i18n, { getShortChar } from '../../i18n'

const flags = {
  vi: {
    key: 'vi-VN',
    name_vi: 'Tiếng Việt',
    name_en: 'Vietnamese',
    icon: '🇻🇳',
  },
  en: {
    key: 'en-US',
    name_vi: 'Tiếng Anh',
    name_en: 'English',
    icon: '🇺🇸',
  },
}

const items = Object.values(flags).map((flag) => ({
  key: flag.key,
  label: (
    <div onClick={() => i18n.changeLanguage(flag.key)} className="flex items-center">
      <span className="fz-4">{flag.icon}</span>
      <span className="pl-4">{flag[`name_${getShortChar()}`]}</span>
    </div>
  ),
}))

const Flag = ({ hasText, textClass, ...props }) => {
  return (
    <Dropdown style={{ color: 'red' }} placement="bottomRight" menu={{ items }} trigger={['click']} {...props}>
      <div className="flex items-center pointer relative pl-3">
        {hasText && <span className={`mr-2 ${textClass}`}>{flags[getShortChar()][`name_${getShortChar()}`]}</span>}
        <span className="fz-6 pr-2">{flags[getShortChar()].icon}</span>
      </div>
    </Dropdown>
  )
}

export default Flag
