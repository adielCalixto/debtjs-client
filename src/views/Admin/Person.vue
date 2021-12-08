<template>
  <div class="container">
        <div class="flex items-center p-4">
            <unicon name="user" width="30" height="30" />
            <h2 class="ml-4 text-3xl text-base-content">{{ person.nome }}</h2>
        </div>
        <div class="mr-4 p-4 bg-base-200 flex border-2" style="min-height: 31.25rem;">
            <div class="w-1/4">
                <div class="bg-base-300 p-4">
                    <h3 class="text-xl text-base-content">Account</h3>
                </div>
            </div>
            <div class="flex-1">
                <div class="tabs border-2 p-2 mb-8">
                    <a @click="onTab = 0" :class="{ 'tab-active': onTab == 0 }" class="tab tab-lifted">Detalhes da conta</a> 
                    <a @click="onTab = 1" :class="{ 'tab-active': onTab == 1 }" class="tab tab-lifted">Dívidas</a> 
                    <a @click="onTab = 2" :class="{ 'tab-active': onTab == 2 }" class="tab tab-lifted">Ações</a>
                </div>
                <div>
                    <PersonInfo v-if="onTab === 0" :person="person" />
                    <PersonDebts v-if="onTab === 1" :debts="person.dividas" @update="getPerson" />
                    <PersonActions v-if="onTab === 2" @update="getPerson" />
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import PersonActions from './components/PersonActions'
import PersonDebts from './components/PersonDebts'
import PersonInfo from './components/PersonInfo'

export default {
    name: 'Person',
    data: function() {
        return {
            onTab: 0,
            person: {
            },
        }
    },
    components: {
        PersonInfo,
        PersonDebts,
        PersonActions,
    },
    inject: ['$axios'],
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