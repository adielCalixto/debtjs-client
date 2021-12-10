<template>
  <OverviewPanel>
    <template v-slot:header>
        <div class="mr-4">
            <unicon name="bill" width="70" height="70" />
        </div>
        <div>
            <h3 class="text-base-content text-xl text-bold">
                Dividas
            </h3>
            <p class="text-md">Gerencie as dividas</p>
        </div>
    </template>

    <template v-slot:actions>
        <button @click="getAll" class="btn btn-outline btn-square mr-2"><unicon name="sync" /></button>
        <button @click="$emit('openModal')" class="btn btn-success"><unicon name="plus" fill="#fff" /> New Debt</button>
    </template>

    <template v-slot:filters>
        <Form @submit.stop v-slot="{ handleSubmit }" class="flex gap-4 mb-4">
            <div class="form-control flex-1">
                <label class="input-group">
                    <span>
                        <unicon name="search" />
                    </span>
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
                <td>
                    <router-link :to="'/a/person/'+debt.pessoa_id"><unicon name="external-link-alt" /></router-link>
                </td>
                <td>{{ debt.usuario_id }}</td>
                <td>{{ debt.createdAt }}</td>
            </tr>
        </tbody>
    </template>
  </OverviewPanel>
</template>

<script>
import OverviewPanel from '@/components/OverviewPanel'
import buildQuery from '@/utils/buildQuery'
import { Form, Field } from 'vee-validate'

export default {
    name: 'DebtOverview',
    components: {
        OverviewPanel,
        Form,
        Field,
    },
    data: function() {
        return {
            query: {
                limit: 10,
                offset: 0,
            },
            debts: [],
        }
    },
    inject: ['$axios'],
    methods: {
        getFiltered: function(values) {
            const query = buildQuery(values)

            this.$axios.get(`/dividas?${query}&limit=${this.query.limit}&offset=${this.query.offset}&groupby=created_at`)
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
            this.$axios.get(`/dividas?limit=${this.query.limit}&offset=${this.query.offset}&groupby=created_at`)
            .then(response => {
                if(response.data) {
                    this.debts = response.data
                }
            })
            .catch(() => {
                console.log("Error ocurred")
            })
        },
    },
    mounted: function() {
        this.getAll();
    },
}
</script>

<style>

</style>