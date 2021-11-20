<template>  
    <div class="navbar px-8 bg-base-200 shadow-md text-base-content">
        <div class="flex-1 px-2 mx-2">
            <span class="text-lg font-bold uppercase">
                SiteLogo
            </span>
        </div> 
        <div class="flex-none px-2 mr-4">
            <div class="items-stretch hidden lg:flex">
                <router-link to="/" class="btn btn-ghost btn-sm rounded-btn">
                    Home
                </router-link>
                <router-link to="/about" class="btn btn-ghost btn-sm rounded-btn">
                    Sobre
                </router-link> 
                <router-link to="/contact" class="btn btn-ghost btn-sm rounded-btn">
                    Contato
                </router-link>
            </div>
        </div> 
        <div class="flex-none">
            <button class="btn btn-outline" v-if="logged" @click="logOut">
                Logout
            </button>
            <router-link to="/login" class="btn btn-outline" v-else>
                Login
            </router-link>
        </div> 
        <div class="flex-none" v-if="logged">
            <router-link to="/search" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">             
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
                </svg>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data: function() {
        return {
            logged: this.$store.state.auth.status.loggedIn,
        }
    },
    methods: {
        logOut: function() {
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        }
    }
}
</script>

<style>
    .top-100 {
        top: 100%;
    }
</style>