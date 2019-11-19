<template>
  <div class="navBar">
    <router-link
      class="navBar__title"
      to="/"
    >
      Armando task manager
    </router-link>
    <router-link
      class="navBar__link"
      to="/tasks"
    >
      Tasks
    </router-link>
    <router-link
      class="navBar__link"
      to="/admin"
    >
      Admin panel
    </router-link>
    <router-link
      class="navBar__link"
      to="/about"
    >
      About
    </router-link>
    <div
      v-if="!user.isAuthorized"
      class="navBar__button"
      @click="openDialog('Login')"
    >
      LOGIN
    </div>
    <div
      v-else
      class="navBar__button"
      @click="openDialog('User')"
    >
      {{ user.userInfo.firstName }} {{ user.userInfo.lastName }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
  },
  methods: {
    openDialog(name) {
      this.$emit('open-dialog', name);
    },
  },
};
</script>

<style lang="scss">
.navBar {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  &__link {
    text-transform: uppercase;
    background: #409EFF;
    padding: 20px 40px;
    color: #fff;
    text-decoration: none;
    border-right: 1px solid #fff;

  }
  &__title {
    text-decoration: none;
    text-transform: uppercase;
    color: #409EFF;
    padding: 20px 40px;
  }

  &__button {
    margin-left: auto;
    cursor: pointer;
    background: #409EFF;
    color: #fff;
    padding: 20px 30px;
  }
}
</style>
