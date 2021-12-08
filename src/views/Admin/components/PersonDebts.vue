<template>
    <div>
        <table v-if="hasDebts" class="table w-full">
            <thead>
            <tr>
                <th></th>
                <th>Id</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Cadastrante</th>
                <th>Criação</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="debt of debts" v-bind:key="debt.divida_id">
                    <td></td>
                    <td>{{ debt.divida_id }}</td>
                    <td>{{ debt.valor }}</td>
                    <td>{{ debt.status }}</td>
                    <td>{{ debt.usuario_id }}</td>
                    <td>{{ debt.createdAt }}</td>
                    <td>
                        <button class="btn btn-sm btn-error" @click="deleteModal = true, debtId = debt.divida_id"><unicon name="trash" /></button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-else class="alert alert-success">
            <div class="flex-1">
                <unicon name="check" />
                <label>Nenhuma dívida encontrada!</label>
            </div>
        </div>

        <button @click="$emit('update')" class="btn btn-square btn-sm mt-8 ml-auto block"><unicon name="sync" fill="#fff" /></button>

        <div :class="{'modal-open': deleteModal}" class="modal">
            <div class="modal-box">
                <p>Esta ação não pode ser desfeita. Tem certeza?</p> 
                <div class="modal-action">
                    <button class="btn btn-error" @click="deleteDebt(debtId)">Excluir</button>
                    <button class="btn btn-outline" @click="deleteModal = false">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonDebts',
    props: {
        debts: {
            type: Array,
            required: true,
        },
    },
    emits: ['update'],
    computed: {
        hasDebts: function() {
            return this.debts.length > 0
        }
    },
    data: function() {
        return {
            debtId: 0,
            deleteModal: false,
        }
    },
    inject: ['$axios'],
    methods: {
        deleteDebt(id) {
            this.$axios.delete(`/dividas/${id}/delete`)
            .then(() => {
                this.$emit("update")
                this.deleteModal = false
            })
            .catch(() => {
                console.log("Error ocurred")
            })
        }
    }
}
</script>

<style>

</style>