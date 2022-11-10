<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ul>
      <li v-for="(item, index) in getCategories" :key="index">
        <a href="#">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapState } from 'pinia'
import { useStoreCategories } from '../store/categories'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  mounted() {
    this.fetchCategories()
  },
  computed: {
    ...mapState(useStoreCategories, ['getCategories'])
  },
  methods: {
    ...mapActions(useStoreCategories, ['setCategories']),
    async fetchCategories() {
      await this.setCategories()
    }
  }
}
</script>
