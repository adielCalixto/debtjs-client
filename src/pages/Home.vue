<template>
  <Header>
    <template v-slot:links>
      <router-link to="/" class="btn btn-ghost btn-sm rounded-btn">
        Home
      </router-link>
      <router-link to="/about" class="btn btn-ghost btn-sm rounded-btn">
        Sobre
      </router-link> 
      <router-link to="/contact" class="btn btn-ghost btn-sm rounded-btn">
        Contato
      </router-link>
    </template>
    <template v-slot:logged>
      <router-link to="/a" class="btn btn-primary btn-outline">
        Dashboard
      </router-link>
    </template>
  </Header>
  <div class="hero min-h-screen bg-base-300">
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
          <Form @submit="logIn">
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
            </div> 
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">
                Enviar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'Home',
  data: function() {
    return {
    }
  },
  components: {
    Header, 
    Footer,
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    logIn: function(values) {
      this.$store.dispatch('auth/login', values)
      .then(() => {
        this.$router.push('/a/search')
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