import axios from 'axios'
import { category_1 } from './pageData/category_1'
import { category_2 } from './pageData/category_2'
import { category_3 } from './pageData/category_3'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/category_1',
        component: 'src/containers/About',
        children: category_1.map( (content, index) => ({
          path: `/work_${index+1}`,
          component: 'src/containers/Page',
          getData: () => ({content})
        }))
      },
      {
        path: '/category_2',
        component: 'src/containers/About',
        children: category_2.map( (content, index) => ({
          path: `/work_${index+1}`,
          component: 'src/containers/Page',
          getData: () => ({content})
        }))
      },
      {
        path: '/category_3',
        children: category_3.map( (content, index) => ({
          path: content.path,
          component: 'src/containers/Page',
          getData: () => ({content: content.data})
        }))
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
