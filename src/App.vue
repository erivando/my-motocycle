<template>
  <a-config-provider :locale="locale">
    <Layout />
  </a-config-provider>
</template>

<script>
import ptBR from 'ant-design-vue/es/locale/pt_BR'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

import Layout from "./components/Layout.vue"

export default {
  components: {
    Layout,
  },
  data() {
    return {
      locale: ptBR,
    }
  }
}
</script>

<style>

</style>
