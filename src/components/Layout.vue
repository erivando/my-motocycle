<template>
  <a-layout class="layout" style="min-height: 100vh">
    <the-header />
    <a-layout-content>
      <a-row justify="center">
        <a-col :lg="15" :sm="24">
          <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', margin: '24px 0' }">
            <router-view></router-view>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import TheHeader from "./TheHeader.vue"
export default {
  components: {
    TheHeader,
  }
}
</script>

<style>

</style>