<template>
  <footer class="footer px-4">
    <b-row align-v="center" class="justify-content-lg-between">
      <b-col lg="6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{year}} <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">Creative Tim</a>
        </div>
      </b-col>
      <b-col lg="6">
        <b-nav align="center" class="nav-footer justify-content-lg-end">
          <b-nav-item href="https://www.kalbelya.com"  target="_blank">
            Kalbelya
          </b-nav-item>
          <b-nav-item href="https://www.kalbelya.com/about-us" target="_blank">
           Nosotros
          </b-nav-item>
          <b-nav-item href="http://www.kalbelya.com/blog" target="_blank">
            Blog
          </b-nav-item>
          <b-nav-item href="www.kalbelya.com/license" target="_blank">
            Licencia
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
