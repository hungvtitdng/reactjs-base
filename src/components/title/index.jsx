import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({ name }) => (
  <Helmet>
    <title>{name}</title>
  </Helmet>
)

export default Title
