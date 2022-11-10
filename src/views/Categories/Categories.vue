<template>
  <div>
    <form-category />
    <a-typography-title :level="3" class="text-center">
      Categorias
    </a-typography-title>
    <div class="d-flex">
      <a-button type="primary" @click="openModal">Adicionar</a-button>
    </div>
    <a-table
      :dataSource="getCategories"
      :columns="columns"
      :loading="loading"
      :pagination="false"
    >
      <template #bodyCell="{column, record}">
        <template v-if="column.key === 'created_at'">
          {{ new Intl.DateTimeFormat('pt-BR').format(new Date(record.created_at)) }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button shape="circle" @click="openModalEdit(record.id)">
              <template #icon>
                <edit-outlined />
              </template>
            </a-button>
            <a-button shape="circle" @click="removeCategory(record.id)">
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
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useStoreCategories } from "@/store/categories"
import { columns } from "./columns"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import FormCategory from "./FormCategory.vue"

export default {
  components: {
    EditOutlined,
    DeleteOutlined,
    FormCategory,
  },
  data() {
    return {
      columns,
      loading: false,
    }
  },
  mounted() {
    this.fetchCategories()
  },
  computed: {
    ...mapState(useStoreCategories, ['getCategories']),
    ...mapWritableState(useStoreCategories, ['category', 'categories'])
  },
  methods: {
    ...mapActions(useStoreCategories, [
        'setCategories',
        'setOpenModalCategory',
        'setCategory',
        'deleteCategory',
      ]),
    async fetchCategories() {
      this.loading = true
      try {
        await this.setCategories()
      } finally {
        this.loading = false
      }
    },
    openModal() {
      this.setOpenModalCategory()
      this.category = {}
    },
    async openModalEdit(id) {
      await this.setCategory(id)
      await this.setOpenModalCategory()
    },
    async removeCategory(id) {
      await this.deleteCategory(id)
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