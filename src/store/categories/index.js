import { defineStore } from 'pinia'
import { default as state } from './state'
import { default as getters } from './getters'
import { default as actions } from './actions'

export const useStoreCategories = defineStore('categories', {
  state,
  getters,
  actions,
})