import React from 'react'
import { Loading3QuartersOutlined } from '@ant-design/icons'

const LoadingModal = ({ visible }) => (
  visible ? (
    <div className="loading-wrap fixed top-0 right-0 left-0 bottom-0">
      <div className="modal-mask" />
      <div className="loading-modal relative">
        <div className="loading-container rounded-full bg-white relative">
          <Loading3QuartersOutlined style={{ fontSize: 70, color: '#1890ff' }} spin />
          <img className="absolute rounded-full" alt="Logo" src="/assets/images/logo.png" />
        </div>
      </div>
    </div>
  ) : null
)

export default LoadingModal
