import api from "@/http/api"
import note from "@/utils/notification"

export default {
  async setCategories() {
    await api.get('/categories-motocycle').then(res => {
      this.categories = res.data.data
    })
  },

  async setCategory(id) {
    await api.get(`/categories-motocycle/${id}`).then((res) => {
      this.category = res.data.data
    })
  },

  async insertCategory (payload) {
    await api.post('/categories-motocycle', payload).then(res => {
      if (res.data.error) {
        throw res
      } else {
        this.categories.push(res.data.data)
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

  async updateCategory (payload) {
    const { id, data } = payload
    await api.put(`/categories-motocycle/${id}`, data).then(res => {
      if (res.data.error) {
        throw res
      } else {
        let index = this.categories.indexOf(id)
        this.categories.splice(index, 1, res.data.data)
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

  async deleteCategory (payload) {
     await api.delete(`/categories-motocycle/${payload}`).then((res) => {
      if (res.data.error) {
        throw res
      } else {
        note.success({
          message: 'Sucesso',
          description: 'Cadastro removido.'
        })
        this.categories = this.categories.filter(item => item.id !== payload)
      }
    }).catch(e => {
      e,
      note.warn({
        message: 'Erro',
        description: 'Não foi possível remover o cadastro.'
      })
    })
  },
  
  setOpenModalCategory() {
    this.openModalCategory = !this.openModalCategory
  },
}