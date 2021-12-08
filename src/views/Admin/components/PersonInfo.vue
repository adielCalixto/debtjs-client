<template>
  <div>
    <div class="bg-base-200 border-2 p-4 mb-4">
      <h3 class="text-md text-base-content mb-2">Informações</h3>

      <div class="text-sm text-gray-500 flex">
        <div class="flex mr-16 gap-2">
          <p>Nome: </p>
          <p>{{ person.nome }}</p>
        </div>

        <div class="flex gap-2">
          <p>CPF: </p>
          <p>{{ person.cpf }}</p>
        </div>
      </div>
    </div>

    <div class="bg-base-200 border-2 p-4 mb-4">
      <h3 class="text-md text-base-content mb-2">Contato</h3>

      <div class="text-sm text-gray-500 flex">
        <div class="flex mr-16 gap-2">
          <p>Email: </p>
          <p>{{ person.email }}</p>
        </div>

        <div class="flex gap-2">
          <p>Telefone: </p>
          <p>{{ person.telefone }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-base-200 border-2 p-4 mb-4">
      <h3 class="text-md text-base-content mb-2">Outras informações</h3>

      <div class="text-sm text-gray-500 flex">
        <div class="flex mr-16 gap-2">
          <p>Data de cadastro: </p>
          <p>{{ personCreated }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonInfo',
  props: {
    person: {
      type: Object,
      required: true,
    }
  },
  computed: {
    personCreated: function() {
      const date = new Date(this.person.createdAt)
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }
  }
}
</script>

<style>

</style>