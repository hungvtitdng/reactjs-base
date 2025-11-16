import React from 'react'

export default ({ name, color, className }) => <i className={`fa-solid fa-${name} ${className}`} style={{ color: `${color ?? 'gray'}` }} />
