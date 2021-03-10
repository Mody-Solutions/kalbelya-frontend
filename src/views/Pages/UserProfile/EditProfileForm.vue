<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Editar perfil </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <a href="/#settings" class="btn btn-sm btn-primary">Configuración</a>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">Información de usuario</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nombre de usuario"
              name="nombre de usuario"
              placeholder="Username"
              v-model="user.username"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="email"
              label="Correo electrónico"
              name="correo electrónico"
              placeholder="mike@email.com"
              v-model="user.email"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="Nombre"
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
              v-model="user.city"
            >
            </base-input>
          </b-col>
          <b-col lg="4">
            <base-input
              type="text"
              label="País"
              name="País"
              placeholder="España"
              v-model="user.country"
            >
            </base-input>
          </b-col>
          <b-col lg="4">
            <base-input
              label="Código postal"
              name="Código postal"
              placeholder="90210"
              v-model="user.postalCode"
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
          <b-form-textarea rows="4" :value="user.aboutMe" id="about-form-textarea"
                           placeholder="Unas breves palabras sobre ti..."></b-form-textarea>
        </b-form-group>
      </div>

    </b-form>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: '',
        title: '',
        company: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        aboutMe: ''
      }
    };
  },
  mounted () {
    let user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  },
  methods: {
    updateProfile() {

    }
  }
};
</script>
<style></style>
