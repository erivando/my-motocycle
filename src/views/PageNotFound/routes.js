export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'pagenotfound',
    component: () => import(/* webpackChunkName: "about" */'./PageNotFound.vue')
  }
]