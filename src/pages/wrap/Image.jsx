import React, { useState } from 'react'
import { Image as ImageAntd } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { IMAGE_DEFAULT } from '../../config/constants'

const Image = ({ width = 80, height = 80, path, preview = true }) => {
  const [loaded, setLoaded] = useState(false)
  const realImageUrl = `${import.meta.env.VITE_API_URL}${path}`

  return (
    <div
      className={`custom-image ${loaded ? 'loaded' : ''}`}
      width={width}
      height={height}
    >
      <img
        src={IMAGE_DEFAULT}
        alt="default"
        className="image-default rounded-2"
        style={{
          width,
          height,
        }}
      />

      <ImageAntd
        className="rounded-2"
        src={realImageUrl}
        preview={preview ? { mask: <EyeOutlined /> } : false}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </div>
  )
}

export default Image
