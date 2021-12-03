<template>
  <div class="p-4 max-w-5xl mx-auto">
      <div class="bg-neutral rounded text-neutral-content shadow-lg p-3 mb-3">
        <p>{{ person.nome }}</p>
        <p>{{ person.cpf }}</p>
        <p>{{ person.telefone }}</p>
        <p>{{ person.email }}</p>
      </div>

      <div v-if="person.dividas.length > 0" class="bg-base text-base-content shadow-lg p-3">
          <div>
            Dividas:
          </div>
          <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                <tr>
                    <th>Id</th> 
                    <th>Valor</th> 
                    <th>Status</th> 
                    <th>Cadastrante</th>
                </tr>
                </thead> 
                <tbody>
                <tr v-for="divida of person.dividas" v-bind:key="divida.divida_id">
                    <th>{{ divida.divida_id }}</th> 
                    <td>{{ divida.valor }}</td> 
                    <td>{{ divida.status }}</td> 
                    <td>{{ divida.usuario_id }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="alert alert-success">
        <div class="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
            </svg> 
            <label>Não há dívidas</label>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Person',
    inject: ['$axios'],
    data: function() {
        return {
            person: {
                dividas: [],
            },
        }
    },
    methods: {
        getPerson: function() {
            this.$axios.get(`/pessoas/${this.$route.params.id}/dividas`)
            .then(response => {
                if(!response.data) {
                    return this.$router.push('/search')
                }

                this.person = response.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function() {
        this.getPerson()
    }
}
</script>

<style>

</style>