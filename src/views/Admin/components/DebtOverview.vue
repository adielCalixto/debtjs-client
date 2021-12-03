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
        <button @click="$emit('openModal')" class="btn btn-success">+ New Debt</button>
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
</template>

<script>
import OverviewPanel from '@/components/OverviewPanel'
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
    },
    mounted: function() {
        this.getAll();
    },
}
</script>

<style>

</style>