export default [
  {
    path: '/motocycles',
    name: 'motocycles',
    component: () => import(/* webpackChunkName: "about" */ './Motocycles.vue')
  }
]