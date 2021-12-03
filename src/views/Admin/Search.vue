<template>  
    <div class="hero md:justify-items-center justify-items-end min-h-screen bg-base">
        <div class="text-center hero-content lg:flex-row flex-col text-base-content">
            <div class="max-w-md place-self-start z-10">
                <h1 class="mb-10 text-5xl font-bold">
                    Busque no sistema
                </h1> 
                <Form @submit="searchMethod" class="relative">
                    <Field type="text" name="value" rules="required" class="w-full pr-16 input input-ghost input-bordered" />
                    <ErrorMessage name="value" class="error" />
                    <button type="submit" class="absolute top-0 right-0 rounded-l-none btn btn-neutral">🔍</button>
                </Form>
            </div>
            <img class="max-w-sm absolute" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F1852%2FPNG%2F512%2Ficonfinder-server2-4417099_116631.png&f=1&nofb=1" />
        </div>
    </div>

    <div>
        <div class="modal" v-if="query" v-bind:class="{ 'modal-open': modalOpen }">
            <div class="modal-box">
                <div>
                    <div class="shadow-lg rounded p-3 flex justify-between" v-for="item of query" v-bind:key="item[0]">
                        <div v-if="item.divida_id">
                            <div class="text-base-content">
                                <p class="text-xl">{{ item.valor }}</p>
                            </div>
                            <router-link class="btn btn-success" v-bind:to="'/a/person/'+item.pessoa_id">Perfil</router-link>
                        </div>
                        <div v-else-if="item.pessoa_id">
                            <div class="text-base-content">
                                <p class="text-xl">{{ item.nome }}</p>
                            </div>
                            <router-link class="btn btn-success" v-bind:to="'/a/person/'+item.pessoa_id">Perfil</router-link>
                        </div>
                    </div>
                </div>
                <div class="modal-action">
                    <button @click="modalOpen=false" class="btn">Close</button>
                </div>
            </div>
        </div>
    </div>

    <FolderMenu class="absolute top-20 left-0">
        <template v-slot:items>
            <div v-for="item of menu" v-bind:key="item.title">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 mr-2 stroke-current">          
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>                
                    </svg>
                    {{ item.title }}
                </span>
                <ul>
                    <li v-for="subitem of item.submenu" v-bind:key="subitem.title" v-bind:class="{bordered: active == (item.title+subitem.title)}">
                        <a @click="search.api = item.api, search.filter = subitem.filter, active = (item.title+subitem.title)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 mr-2 stroke-current">       
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>                   
                            </svg>
                            {{ subitem.title }}
                        </a>
                    </li>
                </ul>
            </div>
        </template>
    </FolderMenu>
</template>

<script>
import FolderMenu from '@/components/FolderMenu'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
    name: 'Search',
    components: {
        Form,
        Field,
        ErrorMessage,
        FolderMenu,
    },
    inject: ['$axios'],
    data: function() {
        return {
            search: {
                api: '',
                filter: '',
            },
            modalOpen: false,
            query: [],
            menu: [
                {
                    title: 'Pessoas',
                    api: 'pessoas',
                    submenu: [
                        {
                            title: 'Nome',
                            filter: 'nome'
                        },
                        {
                            title: 'CPF',
                            filter: 'cpf'
                        },
                    ]
                },
                {
                    title: 'Dividas',
                    api: 'dividas',
                    submenu: [
                        {
                            title: 'Valor',
                            filter: 'valor'
                        },
                    ]
                }
            ],
            active: '',
        }
    },
    methods: {
        searchMethod: function({ value }) {
            if(!this.active) {
                return;
            }

            this.$axios.get(`/${this.search.api}/${value}/${this.search.filter}`)
            .then(response => {
                if(response.data) {
                    this.modalOpen = true;

                    if(Array.isArray(response.data)) {
                        return this.query = response.data
                    }

                    return this.query = [response.data]
                }
            })
        }
    }
}
</script>

<style>

</style>