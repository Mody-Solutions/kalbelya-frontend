<template>
  <router-view></router-view>
</template>

<script>
export default {
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  created: function () {
    this.$store.dispatch('check')
    .then(() => {})
    .catch(() => {})
    const self = this
    this.$http.interceptors.response.use(undefined, function (error) {
      return new Promise(function (resolve, reject) {
        if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
          self.$store.dispatch('logout')
        }
        throw error;
      });
    });
  }
}
</script>
