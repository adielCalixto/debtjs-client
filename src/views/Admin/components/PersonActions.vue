<template>
    <div>
        <div class="flex gap-8">
            <button @click="createModal = true" class="btn flex-1 btn-success">
                <unicon name="plus" fill="#fff" />
                Adicionar débito
            </button>
            <button @click="deleteModal = true" class="btn flex-1 btn-wide btn-error">
                <unicon name="trash" fill="#fff" />
                Deletar pessoa
            </button>
        </div>

        <div class="modal" :class="{'modal-open': createModal}">
            <div class="modal-box">            
                <div class="modal-action block absolute right-0 -top-4 ">
                    <button @click="createModal = false" class="btn btn-sm btn-square"><unicon name="times" fill="#fff" /></button>
                </div>
                <Form @submit="createDivida" >
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Valor</span>
                        </label> 

                        <Field type="number" name="valor" rules="required" class="input input-bordered" />
                        <ErrorMessage name="valor" class="error" />
                    </div>

                    <button class="btn btn-success btn-outline ml-auto block" type="submit">Criar</button>
                </Form>
            </div>
        </div>

        <div class="modal" :class="{'modal-open': deleteModal}">
            <div class="modal-box">            
                <div class="modal-action block absolute right-0 -top-4 ">
                    <button @click="deleteModal = false" class="btn btn-sm btn-square"><unicon name="times" fill="#fff" /></button>
                </div>
                <h2 class="text text-lg">Esta ação é irreversível. Tem certeza?</h2>
                <button @click="deletePessoa" class="btn btn-warning">Deletar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
    name: 'PersonActions',
    data: function() {
        return {
            createModal: false,
            deleteModal: false,
        }
    },
    inject: ['$axios'],
    emits: ['update'],
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    methods: {
        createDivida: function({ valor }) {
            const id = this.$route.params.id

            this.$axios.post('/dividas/create', { valor, pessoa_id: id })
            .then(response => {
                if(response.data) {
                    this.createModal = false
                    this.$emit('update')
                }
            })
            .catch(() => {
                console.log('Error ocurred')
            })
        },
        deletePessoa: function() {
            const id = this.$route.params.id

            this.$axios.delete(`/pessoas/${id}/delete`)
            .then(response => {
                if(response.data) {
                    this.$router.push('/a/search')
                }
            })
            .catch(() => {
                console.log('Error ocurred')
            })
        },
    }
}
</script>

<style>

</style>