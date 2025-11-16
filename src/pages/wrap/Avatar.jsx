import React from 'react'
import { Avatar as AvatarAnt } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const Avatar = ({ size = 30, path }) => {
  if (!path) {
    return <AvatarAnt size={size} icon={<UserOutlined />} />
  }

  const imgSrc = `${import.meta.env.VITE_API_URL}${path}`

  return <AvatarAnt size={size} src={<img src={imgSrc} alt="avatar" />} />
}

export default Avatar
