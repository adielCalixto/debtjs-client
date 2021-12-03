<template>
  <div class="w-full max-w-md mx-auto min-h-screen flex flex-col justify-center">
    <Form @submit="logIn" class="shadow-lg rounded p-10">
      <div class="text-xl mb-3">
        Login
      </div>
      <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label> 
          <Field type="email" name="email" rules="email" class="input input-bordered" />
          <ErrorMessage name="email" class="error" />
        </div> 
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label> 
          <Field type="password" name="password" rules="required" class="input input-bordered" /> 
          <ErrorMessage name="password" class="error" />
          <label class="label ml-auto">
            <a href="#" class="label-text-alt">Forgot password?</a>
          </label>
        </div> 
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary">
            Enviar
          </button>
        </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'Login',
  data: function() {
    return {
    }
  },
  components: {
    Form,
    ErrorMessage,
    Field,
  },
  methods: {
    logIn: function(values) {
      this.$store.dispatch('auth/login', values)
      .then(() => {
        this.$router.push('/a/search') 
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