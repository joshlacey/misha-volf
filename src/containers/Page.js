import React from 'react'
import { withRouteData } from 'react-static'
import ReactPlayer from 'react-player'

export default withRouteData(({ content }) => (
  <div className="content-area">
    <p className="page-title">{content.path}</p>
    {content.data.map((item, index) => {
      let counter = 0
      if (item.type === 'image' && counter === 0) {
        counter += 1
        return (
          <div key={index}>
            <div className="feature-image-wrapper">
              <img className="feature-image" src={`/img/${item.src}`} alt={item.src} />
            </div>
            <p className="caption">{item.caption}</p>
          </div>
        )
      } else if (item.type === 'image' && counter > 0) {
        <div key={index}>
          <img src={`/img/${item.src}`} alt={item.src} />
          <p className="caption">{item.caption}</p>
        </div>
      } else if (item.type === 'text') {
          return <p className="text" key={index}>{item.text}</p>
      } else if (item.type === 'video') {
        return (
          <div style={{paddingTop: '15px'}} key={index}>
            <div className="player-wrapper">
              <ReactPlayer
                className='react-player'
                url={item.url}
                playing={false}
                width='100%'
                height='100%'
                preload="true"
              />
            </div>
            {!!item.caption && <p className="caption">{item.caption}</p>}
          </div>
        )
        // return <div key={index} className="video" dangerouslySetInnerHTML={createMarkup(item.embed_src)} />
      }
    })}
  </div>
))
