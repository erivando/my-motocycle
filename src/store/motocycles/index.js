import { defineStore } from 'pinia'
import { default as state } from './state'
import { default as getters } from './getters'
import { default as actions } from './actions'

export const useStoreMotocycles = defineStore('motocycles', {
  state,
  getters,
  actions,
})