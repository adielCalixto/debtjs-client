<template>
  <Header />

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