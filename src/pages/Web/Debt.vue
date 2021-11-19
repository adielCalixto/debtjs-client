<template>
  <div class="my-10">
      <div class="mx-auto max-w-3xl shadow-lg p-5">
        <h2 class="text-2xl mb-10 text-neutral">Cadastro de débito</h2>
        <div class="form-control flex-1 mr-2">
            <label class="label">
                <span class="label-text">Nome</span>
            </label> 
            <input type="text" class="nome-input input input-bordered">
        </div>
        <div class="flex justify-between">
            <div class="form-control flex-1 mr-2">
                <label class="label">
                    <span class="label-text">CPF</span>
                </label> 
                <input type="text" class="cpf-input input input-bordered">
            </div> 
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Valor</span>
                </label>
                <input type="text" class="valor-input input input-bordered">
            </div>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Valor</span>
            </label> 
            <input type="text" class="input input-bordered">
        </div>
        <button class="btn btn-success mt-10 ml-auto block">Enviar</button>
      </div>
  </div>
</template>

<script>
import { inject } from 'vue'
const axios = inject('$http')

export default {
    name: 'Debt',
    data: function() {
        return {
            pessoa: {
                nome: '',
                email: '',
                telefone: '',
                cpf: '',
            },
            debt: {
                pessoa_id: 0,
                valor: 0,
            }
        }
    },
    methods: {
        createUser: function() {
            const { nome, email, telefone, cpf } = this.pessoa
            axios.post('/usuarios/create', { nome, email, telefone, cpf })
            .then(result => {
                if(result) {
                    console.log('show')
                }
            })
            .catch(() => {
                console.log('error ocurred')
            })
        },
        getUser: function() {
            axios.get('/usuarios')
            .then(result => {
                this.pessoa = result.data
            })
            .catch(() => {
                console.log('error ocurred')
            })
        },
        sendDebt: function() {
            axios.post('/dividas/create', this.debt)
            .then(result => {
                if(result) {
                    console.log('show')
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