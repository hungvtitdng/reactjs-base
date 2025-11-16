import { Col } from 'antd'
import React from 'react'

export default ({ children, ...props }) => <Col className={props.className} xs={props.xs ?? 24} sm={props.sm} md={props.md}>{children}</Col>
