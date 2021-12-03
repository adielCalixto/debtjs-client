<template>
  <Header>
    <template v-slot:links>
      <router-link to="/a" class="btn btn-ghost btn-sm rounded-btn">
        Home
      </router-link>
      <router-link to="/a/search" class="btn btn-ghost btn-sm rounded-btn">
        Buscar
      </router-link> 
      <router-link to="/a/debt" class="btn btn-ghost btn-sm rounded-btn">
        Dividas
      </router-link>
    </template>
    <template v-slot:logged>
      <router-link to="/a/search" class="btn btn-square btn-ghost">
        <unicon name="search" />
      </router-link>
    </template>
  </Header>

    <router-view />

  <Footer />
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Site',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>

</style>