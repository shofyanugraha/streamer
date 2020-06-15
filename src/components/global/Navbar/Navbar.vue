<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="@/assets/images/logo/logo.svg"/>
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-mainmenu"
          @click="toggleMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar-mainmenu" class="navbar-menu" :class="{'is-active': active}">
        <div class="navbar-end">
          <router-link to="/dashboard" class="navbar-item">Video</router-link>
          <div class="navbar-item" v-if="!isAuth">
            <div class="buttons">
              <router-link to="/login" class="button is-primary">Log in</router-link>
            </div>
          </div>

          <b-dropdown v-else v-model="navigation" position="is-bottom-left" aria-role="menu">
            <a class="navbar-item" slot="trigger" role="button">
              <!--
                <img class="img-avatar" svg-inline src="@/assets/images/svg/avatar.svg" alt />
                -->
              <div class="username">
                {{ user.name }}
                <font-awesome-icon icon="caret-down"/>
              </div>
            </a>
            <b-dropdown-item custom aria-role="menuitem">
              <router-link class="act-title" to="/">Logout</router-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
/**
 * Navbar.
 * @displayName Navbar
 */

// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  components: {

  },
  computed: {
    ...mapState({
      isAuth: (state) => state.auth.isAuth,
      user: (state) => state.auth.user,
    }),
  },
  data() {
    return {
      navigation: 'home',
      active: false,
    };
  },
  methods: {
    toggleMenu() {
      this.active = !this.active;
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar{
  background: $light-blue;
  .navbar-menu {
    @media screen and (max-width: $tablet - 1) {
       background: lighten($light-blue, 5%);
    }
    .navbar-item{
      color: #fff;
      border-right: 1px solid darken($light-blue, 5%);
      &:hover, &:focus{
        background: darken($light-blue, 5%);
      }
    }
  }
}

.img-avatar {
  width: 30px;
  border-radius: 50%;
}
.username {
  font-weight: bold;
}

.explore-course {
  width: 100%;
}

</style>
