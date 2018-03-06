import React from 'react'
import { withRouteData } from 'react-static'
import ReactPlayer from 'react-player'

/**
 * Types: heroImage(src, caption), image(src), space(amount), video(url), h3SubHeading(alignment, text), paragraph(text), caption(alignment,text)
 * */

const heroImage = (item, index) => (
  <div key={index}>
    <div className="feature-image-wrapper">
      <img className="feature-image" src={`/img/${item.src}`} alt={item.src} />
    </div>
    <h2 className="dek">{item.caption}</h2>
  </div>
)

const image = (item, index) => <img key={index} src={`/img/${item.src}`} alt={item.src} />

const space = (item, index) => {
  const times = parseInt(item.amount) || 1
  const spaces = []
  for (let i = 0; i < times; i++) {
    spaces.push(<br className="space" key={index} />)
  }
  return <div key={index}>{spaces}</div>
}

const video = (item, index) => (
  <div style={{ paddingTop: '15px' }} key={index}>
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={item.url}
        playing={false}
        width="100%"
        height="100%"
        preload="true"
      />
    </div>
  </div>
)

const h3SubHeading = (item, index) => (
  <h3 key={index} style={{ textAlign: item.alignment || 'left' }} className="sub-heading">
    {item.text}
  </h3>
)

const paragraph = (item, index) => (
  <p className="text" key={index}>
    {item.text}
  </p>
)

const caption = (item, index) => (
  <p key={index} style={{ textAlign: item.alignment || 'center' }} className="caption">
    {item.caption}
  </p>
)

export default withRouteData(({ content }) => (
  <div className="content-area">
    <p className="page-title">{content.path}</p>
    {content.data.map((item, index) => {
      switch (item.type) {
        case 'heroImage':
          return heroImage(item, index)
        case 'image':
          return image(item, index)
        case 'space':
          return space(item, index)
        case 'video':
          return video(item, index)
        case 'h3SubHeading':
          return h3SubHeading(item, index)
        case 'paragraph':
          return paragraph(item, index)
        case 'caption':
          return caption(item, index)
        default:
          return null
      }

      //
      //
      // let counter = 0
      // if (item.type === 'heroImage' && counter === 0) {
      //   counter += 1
      //   return (
      //     <div key={index}>
      //       <div className="feature-image-wrapper">
      //         <img className="feature-image" src={`/img/${item.src}`} alt={item.src} />
      //       </div>
      //       <h2 className="dek">{item.caption}</h2>
      //     </div>
      //   )
      // } else if (item.type === 'image' && counter > 0) {
      //   return <img key={index} src={`/img/${item.src}`} alt={item.src} />
      // } else if (item.type === 'text') {
      //   return (
      //     <p className="text" key={index}>
      //       {item.text}
      //     </p>
      //   )
      // } else if (item.type === 'video') {
      //   return (
      //     <div style={{ paddingTop: '15px' }} key={index}>
      //       <div className="player-wrapper">
      //         <ReactPlayer
      //           className="react-player"
      //           url={item.url}
      //           playing={false}
      //           width="100%"
      //           height="100%"
      //           preload="true"
      //         />
      //       </div>
      //       {!!item.caption && <p className="caption">{item.caption}</p>}
      //     </div>
      //   )
      // return <div key={index} className="video" dangerouslySetInnerHTML={createMarkup(item.embed_src)} />
      // }
    })}
  </div>
))
