<template>
  <div class="w-full max-w-md mx-auto min-h-screen flex flex-col justify-center">
    <form class="shadow-lg rounded p-10">
      <div class="text-xl mb-3">
        Login
      </div>
      <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label> 
          <input v-model="user.email" type="text" placeholder="email" class="input input-bordered">
        </div> 
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label> 
          <input v-model="user.password" type="password" placeholder="password" class="input input-bordered"> 
          <label class="label">
            <a href="#" class="label-text-alt">Forgot password?</a>
          </label>
        </div> 
        <div class="form-control mt-6">
          <input @click.prevent="logIn" type="button" value="Login" class="btn btn-primary">
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    logIn: function() {
      this.$store.dispatch('auth/login', this.user)
      .then(() => {
        this.$router.push('/') 
      })
      .catch(() => {
        console.log("Some error ocurred")
      })
    }
  }
}
</script>

<style>

</style>