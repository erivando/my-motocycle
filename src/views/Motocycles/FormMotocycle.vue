<template>
  <a-modal
    v-model:visible="getOpenModalMotocycle"
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
    <a-form layout="vertical" ref="motocycleForm" :model="form">
      <a-form-item
        label="Nome"
        name="name"
        :rules="[{ required: true, message: 'Campo obrigatório!' }]"
      >
        <a-input v-model:value="form.name" placeholder="Digite uma categoria" />
      </a-form-item>
      <a-form-item
        label="Categoria"
        name="category_id"
        :rules="[{ required: true, message: 'Campo obrigatório!' }]"
      >
        <a-select
          placeholder="Selecione uma categoria"
          v-model:value="form.category_id"
          :options="getCategories"
          :field-names="{ label: 'name', value: 'id'}"
        ></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStoreMotocycles } from '../../store/motocycles'
import {  useStoreCategories } from '../../store/categories'
export default {
  computed: {
    ...mapState(useStoreMotocycles, [
      'getOpenModalMotocycle',
      'getMotocycle',
      'motocycle'
    ]),
    ...mapState(useStoreCategories, [
      'getCategories',
    ]),
    title() {
      if (this.getMotocycle.id) {
        return 'Editar'
      } else {
        return 'Cadastrar'
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        category_id: ''
      }
    }
  },
  methods: {
    ...mapActions(useStoreMotocycles, [
      'setOpenModalMotocycle',
      'insertMotocycle',
      'updateMotocycle',
    ]),
    handleOk() {
      this.$refs.motocycleForm.validate().then(() => {
        if (this.getMotocycle.id) {
          this.edit()
        } else {
          this.save()
        }
      }).catch(e => e)
    },
    handleCancel() {
      this.setOpenModalMotocycle()
      this.$refs.motocycleForm.clearValidate()
    },
    async save() {
      try {
        await this.insertMotocycle(this.form)
      } finally {
        this.setOpenModalMotocycle()
      }
    },
    async edit() {
      try {
        let form = {
          id: this.getMotocycle.id,
          data: this.form
        }
        await this.updateMotocycle(form)
      } finally {
        this.setOpenModalMotocycle()
      }
    }
  },
  watch: {
    'motocycle': function() {
      if (this.getMotocycle.id) {
        this.form.name = this.getMotocycle.name
        this.form.category_id = this.getMotocycle.category_id
      } else {
        this.form = {}
      }
    }
  }
}
</script>

<style>

</style>