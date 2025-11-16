import React from 'react'
import * as Icons from '@ant-design/icons'

const AntIcon = ({ name, color, size, ...rest }) => {
  const IconComponent = Icons[name]

  return (
    <IconComponent
      style={{
        color: color || 'inherit',
        fontSize: size || 14,
      }}
      {...rest}
    />
  )
}

export default AntIcon
