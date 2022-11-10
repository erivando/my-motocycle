import { createRouter, createWebHashHistory } from 'vue-router'
import { default as categories } from "@/views/Categories/routes"
import { default as motocycles } from "@/views/Motocycles/routes"
import { default as pageNotFound } from "@/views/PageNotFound/routes"

const routes = [
  ...categories,
  ...motocycles,
  ...pageNotFound,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
