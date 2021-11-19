<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="flex-col justify-center hero-content lg:flex-row">
      <div class="text-center lg:text-left">
        <h1 class="mb-5 text-5xl font-bold">
          Solicite uma conta já
        </h1> 
        <p class="mb-5">
          E faça o cadastro de negativados em sua empresa
        </p>
      </div> 
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="card-title"> 
            Já tem uma conta?
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
            <input v-model="user.password" type="text" placeholder="password" class="input input-bordered"> 
            <label class="label">
              <a href="#" class="label-text-alt">Forgot password?</a>
            </label>
          </div> 
          <div class="form-control mt-6">
            <input @click="logIn" type="button" value="Login" class="btn btn-primary">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: function() {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    logIn: function() {
      this.$store.dispatch('auth/login', this.user)
      .then(() => {
        this.$router.push('/search')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
  .h-custom {
    height: 80vh;
  }
</style>