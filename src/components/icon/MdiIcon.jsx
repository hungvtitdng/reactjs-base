import React from 'react'
import Mdi from '@mdi/react'
import * as MdiJs from '@mdi/js'

const MdiIcon = ({ name, color, ...props }) => (
  <Mdi
    color={color}
    path={MdiJs[name]}
    size={0.7}
    {...props}
    className={`flex anticon ${props.className}`}
  />
)

export default MdiIcon
