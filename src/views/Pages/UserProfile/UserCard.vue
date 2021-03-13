<template>
  <b-card no-body class="card-profile" :alt="user.name" img-top>
    <b-row class="justify-content-center">
      <b-col lg="3" class="order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <b-img :src="user.img" rounded="circle" />
          </a>
        </div>
      </b-col>
    </b-row>

    <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
      <div class="d-flex justify-content-between">
        <a href="javascript:" @click="connect" class="btn btn-sm btn-info mr-4">Conectar</a>
        <a href="javascript:" @click="message" class="btn btn-sm btn-default float-right">Mensaje</a>
      </div>
    </b-card-header>

    <b-card-body class="pt-0">
      <div class="text-center mt-6">
        <h5 class="h3">
          {{user.name}}<span class="font-weight-light">, {{user.age}}</span>
        </h5>
        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>{{user.city}}, {{user.country}}
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>{{user.position}}
        </div>
        <div>
          <i class="ni education_hat mr-2"></i>{{user.university}}
        </div>
        <hr class="my-4">
        <p>{{user.aboutMe}}</p>
      </div>
    </b-card-body>
  </b-card>
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
    }
  },
  mounted () {
    let user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  },
  methods: {
    connect() {
      console.log('connect')
    },
    message() {
      console.log('message')
    }
  }
};
</script>
<style></style>
