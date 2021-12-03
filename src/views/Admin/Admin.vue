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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">             
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
        </svg>
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