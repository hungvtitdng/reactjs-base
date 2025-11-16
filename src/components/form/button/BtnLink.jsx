import React from 'react'
import { Button } from 'antd'

const BtnLink = ({ text, ...props }) => (
  <Button
    {...props}
    type="link"
    className={`pl-2 pr-2 ${props.className}`}
  >
    {text}
  </Button>
)

export default BtnLink
