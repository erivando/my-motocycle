<template>
  <div>
    <form-motocycle />
    <a-typography-title :level="3" class="text-center">
      Motos
    </a-typography-title>
    <div class="d-flex">
      <a-button type="primary" @click="openModal">Adicionar</a-button>
    </div>
    <a-table
      :dataSource="getMotocycles"
      :columns="columns"
      :loading="loading"
      :pagination="false"
    >
      <template #bodyCell="{column, record}">
        <template v-if="column.key === 'created_at'">
          {{ new Intl.DateTimeFormat('pt-BR').format(new Date(record.created_at)) }}
        </template>
        <template v-else-if="column.key === 'category'">
          {{ record.category.name }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button shape="circle" @click="openModalMotocycleEdit(record.id)">
              <template #icon>
                <edit-outlined />
              </template>
            </a-button>
            <a-button shape="circle" @click="removeMotocycle(record.id)">
              <template #icon>
                <delete-outlined />
              </template>
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useStoreMotocycles } from '../../store/motocycles'
import { useStoreCategories } from '../../store/categories'
import { columns } from './columns'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import FormMotocycle from "./FormMotocycle.vue"

export default {
  components: {
    EditOutlined,
    DeleteOutlined,
    FormMotocycle,
  },
  computed: {
    ...mapState(useStoreMotocycles, [
        'getMotocycles',
      ]),
    ...mapWritableState(useStoreMotocycles, [
        'motocycle'
      ])
  },
  data() {
    return {
      columns,
      loading: false,
    }
  },
  mounted() {
    this.fetchMotocycles()
  },
  methods: {
    ...mapActions(useStoreMotocycles, [
        'setMotocycles',
        'setOpenModalMotocycle',
        'setMotocycle',
        'deleteMotocycle',
      ]),
    ...mapActions(useStoreCategories, [
      'setCategories',
    ]),
    async fetchMotocycles() {
      this.loading = true
      try {
        await this.setMotocycles()
        await this.setCategories()
      } finally {
        this.loading = false
      }
    },
    openModal() {
      this.setOpenModalMotocycle()
      this.motocycle = {}
    },
    openModalMotocycleEdit(id) {
      this.setMotocycle(id)
      this.setOpenModalMotocycle()
    },
    async removeMotocycle(id) {
      await this.deleteMotocycle(id)
    }
  }
}
</script>

<style scoped>
.text-center{
  text-align: center;
}
.d-flex{
  display: flex !important;
  justify-content: end;
  margin-bottom: 24px;
}
</style>