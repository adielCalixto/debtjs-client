<template>
    <div id="my-modal" class="modal" v-bind:class="{'modal-open': modalOpen}">
        <div class="modal-box">
            <Form
            @submit="nextStep"
            >
                <template v-if="currentStep === 0">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">CPF</span>
                        </label> 

                        <Field type="text" name="cpf" rules="required" v-model="formData.cpf" class="input input-bordered" />
                        <ErrorMessage name="cpf" class="error" />
                    </div> 
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Valor</span>
                        </label> 

                        <Field type="number" name="valor" rules="required" v-model="formData.valor" class="input input-bordered" />
                        <ErrorMessage name="valor" class="error" />
                    </div>
                </template>

                <template v-if="currentStep === 1">
                    <div class="mb-4">
                        <h2 class="text-2xl text-bold">Pessoa inexistente</h2>
                        <h3 class="text-md text-base-content">Cadastre-a primeiro</h3>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nome</span>
                        </label> 

                        <Field type="text" name="nome" rules="required" v-model="formData.nome" class="input input-bordered" />
                        <ErrorMessage name="nome" class="error" />
                    </div> 
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">CPF</span>
                        </label> 

                        <Field type="text" name="cpf" rules="required" v-model="formData.cpf" class="input input-bordered" />
                        <ErrorMessage name="cpf" class="error" />
                    </div> 
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label> 

                        <Field type="email" name="email" rules="required|email" v-model="formData.email" class="input input-bordered" />
                        <ErrorMessage name="email" class="error" />
                    </div>
                </template>

                <template v-if="currentStep === 2">
                    <div v-if="erro">
                        <h2 class="text-2xl text-error">{{ erro }}</h2>
                    </div>
                    <div v-else>
                        <h2 class="text-2xl">Confirme os dados:</h2>
                        <p class="text-md">
                            Valor: {{ formData.valor }}
                            CPF: {{ formData.cpf }}
                        </p>
                        <button type="submit" class="btn btn-warning btn-block mt-8">Criar</button>
                    </div>
                </template>

                <button class="btn btn-outline btn-success btn-block mt-8" v-if="currentStep !== 2" type="submit">Próximo</button>
            </Form>
            <div class="modal-action">
                <button @click="modalOpen = false" class="btn">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
    name: 'DebtCreate',
    inject: ['$axios'],
    data: function() {
        return {
            currentStep: 0,
            formData: {},           
            query: {
                limit: 10,
                offset: 0,
            },
            erro: '',
            modalOpen: false,
        }
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    methods: {
        nextStep: function(values) {
            Object.assign(this.formData, values)

            if (this.currentStep === 0) {
                this.getPessoa(this.formData)
                .then(response => {
                    if(response) {
                        this.formData.pessoa_id = response.pessoa_id
                        return this.currentStep = 2
                    }
                    return this.currentStep = 1
                })
                .catch(() => {
                    console.log("Error ocurred")
                })
            }

            if (this.currentStep === 1) {
                this.createPessoa(this.formData)
                .then((response) => {
                    if(response) {
                        this.formData.pessoa_id = response.pessoa_id
                        return this.currentStep = 2;
                    }
                    this.erro = "Usuario não foi cadastrado."
                    return this.currentStep = 2;
                })
            }

            if (this.currentStep === 2) {
                this.createDivida(this.formData)
                .then((response) => {
                    if(response) {
                        this.currentStep = 0
                        this.formData = {}
                        this.modalOpen = false
                        return this.$emit('update')
                    }
                    return this.erro = "Divida não foi criada."
                })
            }
        },
        getPessoa: function({ cpf }) {
            return this.$axios.get(`/pessoas/${cpf}/cpf`, { cpf })
            .then(response => {
                if(response.data) {
                    return Promise.resolve(response.data)
                }
                return Promise.resolve(false)
            })
            .catch(() => {
                console.log('error ocurred')
                return Promise.reject()
            })
        },
        createPessoa: function({ cpf, nome, email, telefone }) {
            return this.$axios.post('/pessoas/create', { cpf, nome, email, telefone })
            .then(response => {
                if(response.data) {
                    return Promise.resolve(response.data)
                }
                return Promise.resolve(false)
            })
            .catch(() => {
                console.log('error ocurred')
            })
        },
        createDivida: function({ valor, pessoa_id }) {
            return this.$axios.post('/dividas/create', { valor, pessoa_id })
            .then(response => {
                if(response.data) {
                    return Promise.resolve(response.data)
                }
                return Promise.resolve(false)
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