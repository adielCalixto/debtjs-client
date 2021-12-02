<template>
  <div class="p-2 bg-base-200">
  <ul class="menu p-4 shadow-lg bg-base-100 rounded-box">
    <slot name="items" />
  </ul>
</div>
</template>

<script>
export default {
    name: 'FolderMenu',
}
</script>

<style>

</style>