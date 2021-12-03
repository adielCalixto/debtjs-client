<template>
  <OverviewPanel>
    <template v-slot:header>
        <span class="text text-5xl">
            💰
        </span>
        <div>
        <h3 class="text-base-content text-xl text-bold">
            Dividas
        </h3>
        <p class="text-md">Gerencie as dividas</p>
        </div>
    </template>

    <template v-slot:actions>
        <button @click="getAll" class="btn btn-outline mr-2">Refresh</button>
        <button @click="modal = true, currentStep = 0" class="btn btn-success">+ New Debt</button>
    </template>

    <template v-slot:filters>
        <Form v-slot="{ handleSubmit }" class="flex gap-4 mb-4">
            <div class="form-control flex-1">
                <label class="input-group">
                    <span>🔍</span>
                    <Field @change="handleSubmit($event, getFiltered)" type="text" placeholder="Digite o valor..." name="valor" class="input flex-1 input-bordered" />
                </label>
            </div>
            <div class="form-control">
                <label class="input-group">
                    <span>Status:</span> 
                    <Field @change="handleSubmit($event, getFiltered)" as="select" name="status" class="input input-bordered">
                        <option value="valida">Ativa</option>
                        <option value="zerada">Inativa</option>
                        <option value="pendente">Pendente</option>
                    </Field>
                </label>
            </div>
            <div class="form-control">
                <label class="input-group">
                    <span>Data:</span> 
                    <Field @change="handleSubmit($event, getFiltered)" type="date" name="data" class="input input-bordered" />
                </label>
            </div>
        </Form>
    </template>

    <template v-slot:table>
        <thead>
        <tr>
            <th></th>
            <th>Id</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Pessoa</th>
            <th>Cadastrante</th>
            <th>Criação</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="debt of debts" v-bind:key="debt.divida_id">
                <td></td>
                <td>{{ debt.divida_id }}</td>
                <td>{{ debt.valor }}</td>
                <td>{{ debt.status }}</td>
                <td>{{ debt.pessoa_id }}</td>
                <td>{{ debt.usuario_id }}</td>
                <td>{{ debt.createdAt }}</td>
            </tr>
        </tbody>
    </template>
  </OverviewPanel>

  <div>
    <div id="my-modal" class="modal" v-bind:class="{'modal-open': modal}">
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
                <button @click="modal = false" class="btn">Cancelar</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import OverviewPanel from '@/components/OverviewPanel'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
    name: 'Debt',
    components: {
        OverviewPanel,
        Form,
        Field,
        ErrorMessage,
    },
    inject: ['$axios'],
    data: function() {
        return {
            currentStep: 0,
            formData: {},
            modal: false,
            debts: [],
            query: {
                limit: 10,
                offset: 0,
            },
            erro: '',
        }
    },
    mounted: function() {
        this.getAll();
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
                        this.getAll()
                        return this.modal = false
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
        getFiltered: function(values) {
            var esc = encodeURIComponent;
            var query = Object.keys(values)
                .map(k => esc(k) + '=' + (values[k] ? esc(values[k]) : ''))
                .join('&');

            this.$axios.get(`/dividas?${query}&limit=${this.query.limit}&offset=${this.query.offset}`)
            .then(response => {
                if(response.data) {
                    this.debts = response.data
                }
                else {
                    this.debts = []
                }
            })
            .catch(() => {
                console.log("Error ocurred")
            })
        },
        getAll: function() {
            this.$axios.get(`/dividas?limit=${this.query.limit}&offset=${this.query.offset}`)
            .then(response => {
                if(response.data) {
                    this.debts = response.data
                }
            })
            .catch(() => {
                console.log("Error ocurred")
            })
        },
    }
}
</script>

<style>

</style>