<template>  
  <div class="artboard shadow-md p-4 my-8 mx-auto max-w-screen-xl">
    <div class="flex justify-between mb-8">
        <div class="flex">
            <slot class="mr-auto" name="header">
            </slot>
        </div>
        <div>
            <slot name="actions">
            </slot>
        </div>
    </div>

    <slot name="filters">
    </slot>

    <table class="table w-full">
        <slot name="table">
        </slot>
    </table>
  </div>
</template>

<script>
export default {
    name: 'OverviewPanel',
}
</script>

<style>

</style>