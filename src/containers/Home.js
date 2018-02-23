import React from 'react'
import { withRouteData } from 'react-static'

export default withRouteData(({ content }) => {
  return (
    <div>
      <p className="page-title">{content.image.title}</p>
      <img src={`/img/${content.image.src}`} alt={content.image.src} />
      <p style={{textAlign: 'center'}}>{content.text}</p>
    </div>
  )
})
