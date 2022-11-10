import api from "@/http/api"
import { useStoreCategories } from "../categories/index"
import note from "@/utils/notification"

export default {
  async setMotocycles() {
    await api.get('/motocycles').then(res => {
      this.motocycles = res.data.data
    })
  },
  async setMotocycle(payload) {
    await api.get(`/motocycles/${payload}`).then(res => {
      this.motocycle = res.data.data
    }).catch(e => e)
  },
  async insertMotocycle(payload) {
    await api.post('/motocycles', payload).then(res => {
      if (res.data.error) {
        throw res
      } else {
        const store = useStoreCategories()
        let category = store.categories.find(item => item.id === payload.category_id)
        let data = { ...res.data.data, category }
        this.motocycles.push(data)
        note.success({
          message: 'Sucesso',
          description: 'Cadastro realizado.'
        })
      }
    }).catch(e => {
      e,
      note.warn({
        message: 'Erro',
        description: 'Não foi possível realizar o cadastro.'
      })
    })
  },
  async updateMotocycle(payload) {
    const { id, data } = payload
    await api.put(`/motocycles/${id}`, data).then(res => {
      if (res.data.error) {
        throw res
      } else {
        const store = useStoreCategories()
        let index = this.motocycles.indexOf(id)
        let category = store.categories.find(item => item.id === data.category_id)
        let newData = { ...res.data.data, category }
        this.motocycles.splice(index, 1, newData)
        note.success({
          message: 'Sucesso',
          description: 'Cadastro atualizado.'
        })
      }
    }).catch(e => {
      e,
      note.warn({
        message: 'Erro',
        description: 'Não foi possível atualizar o cadastro.'
      })
    })
  },
  async deleteMotocycle(payload) {
    await api.delete(`/motocycles/${payload}`).then((res) => {
      if (res.data.error) {
        throw res
      } else {
        this.motocycles = this.motocycles.filter(item => item.id !== payload)
        note.success({
          message: 'Sucesso',
          description: 'Cadastro removido.'
        })
      }
    }).catch(e => {
      e,
      note.warn({
        message: 'Erro',
        description: 'Não foi possível remover o cadastro.'
      })
    })
  },
  setOpenModalMotocycle() {
    this.openModalMotocycle = !this.openModalMotocycle
  }
}