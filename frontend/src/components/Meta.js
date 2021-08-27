import React from 'react'
import { Helmet } from 'react-helmet'

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='description' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to JGE Store',
  keywords: 'buy products, cheap products, college metarials',
  description: 'Sell all exclusive product related to JGEC',
}

export default Meta
