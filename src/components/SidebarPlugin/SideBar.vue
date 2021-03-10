<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">Show</navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="Kalbelya">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img :alt="model.name" :src="model.img">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">¡Bienvenido!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Mi Perfil</span>
                        </router-link>
                        <router-link to="/settings" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Configuración</span>
                        </router-link>
                        <router-link to="/support" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Soporte</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a href="/#/logout" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Salir</span>
                        </a>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">Documentación</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <a class="nav-link"
                           href="#!">
                            <i class="ni ni-spaceship"></i> Comenzando
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="#!">
                            <i class="ni ni-palette"></i> Bases
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="#!">
                            <i class="ni ni-ui-04"></i> Componentes
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: '/img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: false,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    data() {
      return {
        model: {
          name: '',
          img: ''
        }
      }
    },
    mounted () {
      let user = localStorage.getItem('user');
      this.model = user ? JSON.parse(user) : null;
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
