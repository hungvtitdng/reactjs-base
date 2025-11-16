import React from 'react'
import { Grid, Modal as ModalReact } from 'antd'
import { MODAL_SIZE } from '../../config/constants'

const { useBreakpoint } = Grid

const Modal = ({ children, width, top, title, extra, ...props }) => {
  const screens = useBreakpoint()

  return (
    <ModalReact
      title={[
        <h2 key="1" className="inline mb-0">
          {title}
        </h2>,
        <div key="2" className="float-right mr-4">
          {extra}
        </div>,
      ]}
      className=""
      zIndex={1050}
      width={width ?? 520}
      style={{ top: top ?? (screens.xs || width === MODAL_SIZE.FULL ? 20 : null) }}
      footer={null}
      {...props}
    >
      {children}
    </ModalReact>
  )
}

export default Modal
