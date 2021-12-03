<template>
  <DebtOverview ref="overview" @openModal="$refs.create.modalOpen = true" />

  <DebtCreate ref="create" @update="$refs.overview.getAll()" />
</template>

<script>
import DebtOverview from './components/DebtOverview'
import DebtCreate from './components/DebtCreate'

export default {
    name: 'Debt',
    components: {
        DebtOverview,
        DebtCreate,
    },
}
</script>

<style>

</style>