import React from 'react'
import axios from 'axios'
import { category_1 } from './pageData/category_1'
import { category_2 } from './pageData/category_2'
import { category_3 } from './pageData/category_3'
import { home } from './pageData/home'

export default {
  siteRoot: 'https://boring-euler-fa3a3e.netlify.com',
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({ content: home }),
      },
      {
        path: '/ux',
        component: 'src/containers/About',
        children: category_1.map( (content, index) => ({
          path: content.path,
          component: 'src/containers/Page',
          getData: () => ({content})
        }))
      },
      {
        path: '/projects',
        component: 'src/containers/About',
        children: category_2.map( (content, index) => ({
          path: content.path,
          component: 'src/containers/Page',
          getData: () => ({content})
        }))
      },
      {
        path: '/objects',
        children: category_3.map( (content, index) => ({
          path: content.path,
          component: 'src/containers/Page',
          getData: () => ({ content })
        }))
      },
      {
        path: '/cv',
        children: category_3.map( (content, index) => ({
          path: content.path,
          component: 'src/containers/Page',
          getData: () => ({ content })
        }))
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
}
