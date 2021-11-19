<template>  
    <div class="hero min-h-screen bg-primary">
        <div class="hero-overlay bg-opacity-60"></div> 
        <div class="text-center hero-content text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-10 text-5xl font-bold">
                    Busque no sistema
                </h1>
                <SearchBar searchholder="Nome" />
            </div>
        </div>
    </div>

    <div>
        <div class="modal" v-bind:class="{ 'modal-open': modalOpen }">
            <div class="modal-box">
                <p>Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla ea quasi eligendi. Saepe velit autem minima.</p> 
                <div class="modal-action">
                    <button @click="modalOpen = false" class="btn">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import { inject } from 'vue'
const axios = inject('$http')

export default {
    name: 'Search',
    components: {
        SearchBar
    },
    data: function() {
        return {
            modalOpen: false
        }
    },
    methods: {
        fetchData: function() {
            axios.get('/users')
            .then(response => {
                console.log(response)
            })
        }
    }
}
</script>

<style>

</style>