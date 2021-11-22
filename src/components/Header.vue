<template>  
    <div class="navbar px-8 bg-base-200 shadow-lg text-base-content">
        <div class="flex-1 px-2 mx-2">
            <span class="text-lg font-bold uppercase">
                SiteLogo
            </span>
        </div> 
        <div class="flex-none px-2 mr-4">
            <div class="items-stretch hidden lg:flex">
                <slot name="links" />
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
        <div class="flex-none ml-4" v-if="logged">
            <slot name="logged" />
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