<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-3">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">¡Bienvenido!</h1>
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
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <b-alert variant="info">
                Has salido exitosamente
              </b-alert>
              <div class="text-center text-muted mb-4">
                <small>Identifícate en la aplicación</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="email"
                              :rules="{required: true, email: true}"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="password"
                              :rules="{required: true}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Clave"
                              v-model="model.password">
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe">Recordarme</b-form-checkbox>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">Entrar</base-button>
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
              <router-link to="/register" class="text-light"><small>Crear cuenta</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        logout: false,
        error: false,
        model: {
          app_request: 'frontend',
          email: '',
          password: '',
          rememberMe: false,
        }
      }
    },
    methods: {
      onSubmit () {
        const formValidator = this.$refs.formValidator;
        const router = this.$router;
        this.$store.dispatch('login', this.model)
          .then((response) => {
            if(response.data.hasOwnProperty('user')){
              router.push('/dashboard')
            } else {
              formValidator.setErrors(response.data)
            }
          })
          .catch((error) => console.log(error))
      }
    }
  }
</script>
