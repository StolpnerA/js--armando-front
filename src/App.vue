<template>
  <div>
    <nav-bar @open-dialog="openDialog" />
    <div class="body">
      <router-view />
    </div>
    <user-dialog
      v-if="isUserDialogOpen"
      :is-open="isUserDialogOpen"
      :user="userInfo"
      @update="updateUser"
      @logout="logout"
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
import { mapState, mapMutations } from 'vuex';
import NavBar from '@/components/common/NavBar.vue';
import LoginDialog from '@/components/dialogs/LoginDialog.vue';
import UserDialog from '@/components/dialogs/UserDialog.vue';

import { editUser } from '@/helpers/api';

export default {
  name: 'App',
  components: {
    NavBar,
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
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo', 'authorizeUser']),
    openDialog(name) {
      this[`is${name}DialogOpen`] = true;
    },
    closeDialog(name) {
      this[`is${name}DialogOpen`] = false;
    },
    logout() {
      this.updateUserInfo({});
      this.authorizeUser(false);
      localStorage.userJwt = '';
      this.$router.push({ name: 'home' });
      this.closeDialog('User');
    },
    async updateUser(value) {
      const user = await editUser(value);
      this.updateUserInfo(user);
      this.closeDialog('User');
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
  margin: 0 auto;
}
</style>
