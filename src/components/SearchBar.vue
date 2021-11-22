<template>
  <div class="form-control">
    <div class="relative">
      <input type="text" v-bind:placeholder="searchholder" v-model="this.$parent.search" class="w-full pr-16 input input-ghost input-bordered"> 
      <button @click="$emit('search')" class="absolute top-0 right-0 rounded-l-none btn btn-neutral">🔍</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: [
    'searchholder',
  ],
  emits: ['search']
}
</script>

<style>

</style>