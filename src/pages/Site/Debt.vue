<template>
  <div class="my-10">
      <div class="mx-auto max-w-3xl shadow-lg p-5">
        <h2 class="text-2xl mb-10 text-neutral-content">Cadastro de débito</h2>
        <div class="flex justify-between">
            <div class="form-control flex-1 mr-2">
                <label class="label">
                    <span class="label-text">CPF</span>
                </label> 
                <input v-model="pessoa.cpf" type="text" class="input input-bordered">
            </div> 
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Valor</span>
                </label>
                <input v-model="debt.valor" type="text" class="input input-bordered">
            </div>
        </div>
        <button class="btn btn-success mt-10 ml-auto block" @click="getUser">Enviar</button>
      </div>
  </div>
  <div>
    <div id="my-modal" class="modal" v-bind:class="{'modal-open': modal}">
        <div class="modal-box">
            <h3 class="text-xl text-base-content">Pessoa inexistente. Realize o cadastro primeiro.</h3>
            <div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Nome</span>
                    </label>
                    <input v-model="pessoa.nome" type="text" class="input input-bordered">
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">CPF</span>
                    </label>
                    <input v-model="pessoa.cpf" type="text" class="input input-bordered">
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input v-model="pessoa.email" type="text" class="input input-bordered">
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Telefone</span>
                    </label>
                    <input v-model="pessoa.telefone" type="text" class="input input-bordered">
                </div>
            </div>
            <div class="modal-action"> 
                <button @click="createUser" class="btn btn-success">Submit</button>
                <button @click="modal = false" class="btn">Close</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Debt',
    inject: ['$axios'],
    data: function() {
        return {
            modal: false,
            pessoa: {
                nome: '',
                email: '',
                telefone: '',
                cpf: '',
                pessoa_id: '',
            },
            debt: {
                valor: 0,
            }
        }
    },
    methods: {
        createUser: function() {
            const { nome, email, telefone, cpf } = this.pessoa
            this.$axios.post('/pessoas/create', { nome, email, telefone, cpf })
            .then(result => {
                if(result.data) {
                    this.pessoa = result.data
                    this.sendDebt()
                    this.modal = false
                }
            })
            .catch(() => {
                console.log('error ocurred')
            })
        },
        getUser: function() {
            this.$axios.get(`/pessoas/${this.pessoa.cpf}/cpf`)
            .then(result => {
                if(result.data) {
                    this.pessoa = result.data
                    this.sendDebt()
                } else {
                    this.modal = true
                }
            })
            .catch(() => {
                console.log('error ocurred')
            })
        },
        sendDebt: function() {
            this.$axios.post('/dividas/create', { valor: this.debt.valor, pessoa_id: this.pessoa.pessoa_id })
            .then(result => {
                if(result.data) {
                    console.log(result.data)
                }
            })
            .catch(() => {
                console.log('error ocurred')
            })
        },
    }
}
</script>

<style>

</style>