<template>
  <div class="home">
    <router-link
      v-if="user.isAuthorized"
      to="/tasks"
    >
      Tasks
    </router-link>
    <router-link to="/about">
      About
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  a {
    color: #333;
    font-size: 20px;
    text-decoration: none;
    text-transform: uppercase;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 400px;
    transition: 0.3s;
    margin: 20px;
    &:hover {
      box-shadow:0 0 10px rgba(100, 100, 100, 0.3);
    }
  }
}
</style>
