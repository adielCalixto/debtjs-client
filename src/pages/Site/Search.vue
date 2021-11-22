<template>  
    <div class="hero min-h-screen bg-blue-300">
        <div class="hero-overlay bg-opacity-60"></div> 
        <div class="text-center hero-content text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-10 text-5xl font-bold">
                    Busque no sistema
                </h1>
                <SearchBar searchholder="Nome" @search="searchMethod" />
            </div>
        </div>
    </div>

    <div>
        <div class="modal" v-bind:class="{ 'modal-open': modalOpen }">
            <div class="modal-box">
                <div>
                    <div class="shadow-lg rounded p-3 flex justify-between" v-for="pessoa in pessoas" v-bind:key="pessoa.pessoa_id">
                        <div class="text-base-content">
                            <p class="text-xl">{{ pessoa.nome }}</p>
                            <p class="text-md">{{ pessoa.telefone }}</p>
                        </div>
                        <router-link class="btn btn-success" v-bind:to="'/person/' + pessoa.pessoa_id">Perfil</router-link>
                    </div>
                </div>
                <div class="modal-action">
                    <button @click="modalOpen = false" class="btn">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
    name: 'Search',
    components: {
        SearchBar
    },
    inject: ['$axios'],
    data: function() {
        return {
            search: '',
            modalOpen: false,
            pessoas: []
        }
    },
    methods: {
        searchMethod: function() {
            this.$axios.get(`/pessoas/${this.search}/nome`)
            .then(response => {
                if(response.data) {
                    this.pessoas = response.data
                }
                this.modalOpen = true
            })
        }
    }
}
</script>

<style>

</style>