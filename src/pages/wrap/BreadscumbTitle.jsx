import React from 'react'
import { Link } from 'react-router-dom'
import FaIcon from '../../components/icon/FaIcon'

const BreadcrumbTitle = ({ name, path, iconName }) => (
  <>
    <FaIcon name={iconName} />
    {path ? <Link className="ml-1" to={path}>{name}</Link> : <span className="ml-2">{name}</span>}
  </>
)

export default BreadcrumbTitle
