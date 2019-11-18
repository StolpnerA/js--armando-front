<template>
  <div>
    <div class="header">
      <div class="header__title">
        {{ $route.name }}
      </div>
      <div
        v-if="!user.isAuthorized"
        class="header__button"
        @click="openLoginDialog"
      >
        LOGIN
      </div>
      <div
        v-else
        class="header__button"
        @click="openUserDialog"
      >
        {{ user.userInfo.firstName }} {{ user.userInfo.lastName }}
      </div>
    </div>
    <div class="body">
      <router-view />
    </div>
    <user-dialog
      v-if="isUserDialogOpen"
      :is-open="isUserDialogOpen"
      @close="isUserDialogOpen = false"
    />
    <login-dialog
      v-if="isLoginDialogOpen"
      :is-open="isLoginDialogOpen"
      @close="isLoginDialogOpen = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoginDialog from '@/components/dialogs/LoginDialog.vue';
import UserDialog from '@/components/dialogs/UserDialog.vue';

export default {
  name: 'App',
  components: {
    LoginDialog,
    UserDialog,
  },
  data() {
    return {
      isUserDialogOpen: false,
      isLoginDialogOpen: false,
    };
  },
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
  },
  methods: {
    openUserDialog() {
      this.isUserDialogOpen = true;
    },
    openLoginDialog() {
      this.isLoginDialogOpen = true;
    },
  },
};
</script>

<style lang="scss">
  body {
    font-family: "Helvetica Neue",
    Helvetica,"PingFang SC","Hiragino Sans GB",
    "Microsoft YaHei",Arial,sans-serif;
    padding: 0;
    margin: 0;
  }
  .body {
    box-sizing: border-box;
    padding: 100px 40px 40px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .header {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    &__title {
      padding: 20px 40px;
    }
    &__button {
      cursor: pointer;
      background: #409EFF;
      color: #fff;
      padding: 20px 30px;
    }
  }
</style>
