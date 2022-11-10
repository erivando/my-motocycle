<template>
  <a-modal
    v-model:visible="getOpenModalCategory"
    :title="title"
    :keyboard="false"
    :closable="false"
    @ok="handleOk"
    :onCancel="handleCancel"
    :maskClosable="false"
  >
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancelar</a-button>
      <a-button key="submit" type="primary" @click="handleOk">Submit</a-button>
    </template>
    <a-form layout="vertical" ref="categoryForm" :model="form">
      <a-form-item
        label="Nome"
        name="name"
        :rules="[{ required: true, message: 'Campo obrigatório!' }]"
      >
        <a-input v-model:value.trim="form.name" placeholder="Digite uma categoria" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from "pinia"
import { useStoreCategories } from "@/store/categories"
export default {
  computed: {
    ...mapState(useStoreCategories, [
        'getOpenModalCategory',
        'getCategory',
        'category'
      ]),
      title() {
        if (this.getCategory.id) {
          return 'Editar'
        } else {
          return 'Adicionar'
        }
      }
  },
  data() {
    return {
      form: {
        name: '',
      },
    }
  },
  methods: {
    ...mapActions(useStoreCategories, [
        'setOpenModalCategory',
        'insertCategory',
        'updateCategory',
      ]),
    handleOk() {
      this.$refs.categoryForm.validate().then((val) => {
        if (this.getCategory.id) {
          this.edit()
        } else {
          this.save()
        }
      }).catch(e => { console.error(e); })
    },
    handleCancel() {
      this.setOpenModalCategory()
      this.$refs.categoryForm.clearValidate()
    },
    async save() {
      try {
        await this.insertCategory(this.form)
      } finally {
        this.setOpenModalCategory()
      }
    },
    async edit() {
      try {
        let form = {
          id: this.getCategory.id,
          data: this.form
        }
        await this.updateCategory(form)
      } finally {
        this.setOpenModalCategory()
      }
    }
  },
  watch: {
    'category': function() {
      if (this.getCategory.id) {
        this.form.name = this.getCategory.name
      } else {
        this.form.name = ''
      }
    }
  }
}
</script>

<style>

</style>