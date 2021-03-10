<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-2">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Crear una cuenta</h1>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Crea una cuenta en la aplicación</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Nombre"
                              name="Nombre"
                              :rules="{required: true}"
                              v-model="model.name">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Clave"
                              type="password"
                              name="Clave"
                              vid="password"
                              :rules="{required: true, min: 6}"
                              v-model="model.password">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Confirmar clave"
                              type="password"
                              name="Confirmar clave"
                              :rules="{required: true, min: 6, confirmed: 'password'}"
                              v-model="model.password_confirmation">
                  </base-input>
                  <b-row class=" my-4">
                    <b-col cols="12">
                      <base-input :rules="{ required: { allowFalse: false } }"
                                  name="Términos y condiciones">
                        <b-form-checkbox v-model="model.agree">
                          <span class="text-muted">Acepto los <a href="#!">términos y condiciones</a></span>
                        </b-form-checkbox>
                      </base-input>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Crear cuenta</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/forgot-password" class="text-light"><small>¿Olvidaste tu clave?</small></router-link>
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/login"
                           class="text-light"><small>¿Ya tienes una cuenta? Entra aquí</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <modal :show.sync="registered"
           modal-classes="modal-success"
           modal-content-classes="bg-gradient-success"
           showClose="false" type="notice" @close="goToDashboard">

      <div class="py-3 text-center mt-7">
        <i class="ni ni-bell-55 ni-3x"></i>
        <h4 class="heading mt-4">¡Atención!</h4>
        <p>{{message}}</p>
      </div>


      <template slot="footer">
        <base-button type="white" @click="goToDashboard">Entendido</base-button>
      </template>

    </modal>
  </div>
</template>
<script>

  import axios from 'axios'
  import router from '../../routes/router'

  export default {
    name: 'register',
    data () {
      return {
        registered: false,
        message: '',
        model: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          agree: false
        }
      }
    },
    methods: {
      goToDashboard(){
        router.push('/dashboard')
      },
      onSubmit () {
        axios.post('/api/register', this.model)
          .then((response) => {
            if (response && response.hasOwnProperty('data') &&
              response.data.hasOwnProperty('user') &&
              response.data.hasOwnProperty('token')) {
              this.registered = true
              let data = response.data
              localStorage.setItem('user', JSON.stringify(data.user))
              localStorage.setItem('token', data.token)
              axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
              this.message = data.message;
            }
          }).catch((error) => {
          this.$refs.formValidator.setErrors(error.response.data)
        })
      }
    }

  }
</script>
<style></style>
