<template>
  <a-layout-header>
    <a-row justify="center">
      <a-col :lg="16" :sm="24">
        <a-menu
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          update:selectedkeys="current"
        >
          <a-menu-item>My Motocycle</a-menu-item>
          <a-menu-item key="categories">
            <template #icon>
              <bars-outlined />
            </template>
            <router-link to="/">
              Categorias
            </router-link>
          </a-menu-item>
          <a-menu-item key="motocycles">
            <router-link to="/motocycles">
              Motos
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import { BarsOutlined } from "@ant-design/icons-vue"
export default {
  components: {
    BarsOutlined,
  },
}
</script>

<style>

</style>