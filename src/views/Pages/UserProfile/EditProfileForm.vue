<template>
  <card>
    <b-row align-v="center" slot="header">
      <b-col cols="8">
        <h3 class="mb-0">Editar perfil </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <a href="/#settings" class="btn btn-sm btn-primary">Configuración</a>
      </b-col>
    </b-row>

    <validation-observer v-slot="{handleSubmit}" ref="formValidator">
      <b-form @submit.prevent="handleSubmit(updateProfile)">
        <h6 class="heading-small text-muted mb-4">Información de usuario</h6>

        <div class="pl-lg-4">
          <b-row>
            <b-col lg="12">
              <base-input
                type="email"
                label="Correo electrónico"
                name="Correo electrónico"
                placeholder="mike@email.com"
                :rules="{required: true, email: true}"
                :disabled="loading"
                v-model="user.email"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <base-input
                type="text"
                label="Nombre"
                name="Nombre"
                :rules="{required: true}"
                :disabled="loading"
                placeholder="Nombre"
                v-model="user.firstName"
              >
              </base-input>
            </b-col>
            <b-col lg="6">
              <base-input
                type="text"
                label="Apellido"
                name="Apellido"
                :rules="{required: true}"
                :disabled="loading"
                placeholder="Apellido"
                v-model="user.lastName"
              >
              </base-input>
            </b-col>
          </b-row>
        </div>
        <hr class="my-4">

        <!-- Address -->
        <h6 class="heading-small text-muted mb-4">Información de contacto</h6>

        <div class="pl-lg-4">
          <b-row>
            <b-col md="12">
              <base-input
                type="text"
                label="Dirección"
                name="dirección"
                placeholder="Edificio 62"
                :disabled="loading"
                v-model="user.address"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <base-input
                type="text"
                label="Ciudad"
                name="ciudad"
                placeholder="Ciudad"
                :disabled="loading"
                v-model="user.city"
              >
              </base-input>
            </b-col>
            <b-col lg="4">
              <label for="" class="form-control-label">País</label>
              <v-select :value="user.country"
                        :options="countries"
                        @input="setCountry"
                        :disabled="loading"
                        label="name"></v-select>
            </b-col>
            <b-col lg="4">
              <base-input
                label="Código postal"
                name="Código postal"
                placeholder="90210"
                v-model="user.postalCode"
                :disabled="loading"
              >
              </base-input>
            </b-col>
          </b-row>
        </div>

        <hr class="my-4">
        <!-- Description -->
        <h6 class="heading-small text-muted mb-4">Sobre mi</h6>
        <div class="pl-lg-4">
          <b-form-group label="Sobre mi" label-class="form-control-label" class="mb-0" label-for="about-form-textarea">
            <b-form-textarea rows="4" v-model="user.aboutMe"
                             id="about-form-textarea"
                             :disabled="loading"
                             placeholder="Unas breves palabras sobre ti..."></b-form-textarea>
          </b-form-group>
          <hr>
          <base-button block type="primary" :disabled="loading" native-type="submit" class="my-4">
            <span v-if="!loading">Guardar datos</span>
            <span v-else><i class="fas fa-circle-notch fa-spin"></i> Guardando...</span>
          </base-button>
        </div>
      </b-form>
    </validation-observer>
  </card>
</template>
<script>
  import countries from '../../../plugins/country'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        loading: false,
        countries: countries,
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    mounted() {
      this.loading = true;
      this.$http.get('/user')
        .then(response => {
          this.loading = false;
          this.user = response.data;
        })
        .catch(() => {})
    },
    methods: {
      updateProfile () {
        this.loading = true;
        const formValidator = this.$refs.formValidator;
        this.$http.put('/user', this.user)
        .then(response => {
          this.loading = false;
          if(response.data.hasOwnProperty('user')){
            this.$store.commit('update_logged_in_user', response.data.user)
          } else {
            formValidator.setErrors(response.data)
          }
        })
        .catch(() => {this.loading = false;})
      },
      setCountry(country) {
        this.user.country = country.code;
      }
    }
  }
</script>
<style>
  .vs__dropdown-toggle {
    padding: 4px 0 7px 0;
  }
  .vs__selected {
    color: #8898aa;
  }
</style>
