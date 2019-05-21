/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Routes
import paths from './paths'

function route (path, view, name, props) {
  return {
    name: name || view,
    props,
    path,
    component: (resovle) => import(
      `@/views/${view}.vue`
    ).then(resovle)
  }
}

Vue.use(Router)
console.error(com.preconfig.producer.basePath)
// Create a new router
const router = new Router({
  mode: 'history',
  base: com.preconfig.producer.basePath,
  routes: paths.map(path => route(path.path, path.view, path.name, path.props)).concat([
    { path: '*', redirect: '/home' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

export default router
