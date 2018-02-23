import React from 'react'
import { withRouteData } from 'react-static'

function createMarkup (data) {
  return { __html: data }
}

export default withRouteData( ({ content }) => {
  return (<div className="content-area">
    {content.map((item, index) => {
      if (item.type === 'image') {
        return (
          <div key={index}>
            <img
              src={`/img/${item.src}`}
              alt={item.src}
            />
            <p>{item.caption}</p>
          </div>
        )
      } else if (item.type === 'text') {
        return <p key={index}>{item.text}</p>
      } else if (item.type === 'video') {
        return <div key={index} dangerouslySetInnerHTML={createMarkup(item.embed_src)} />
      }
    })}
  </div>)
})
