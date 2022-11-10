export default [
  {
    path: '/',
    name: 'categories',
    component: () => import(/* webpackChunkName: "about" */ './Categories.vue')
  }
]