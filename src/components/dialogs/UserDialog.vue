<template>
  <el-dialog
    class="userDialog"
    title="User Info"
    :visible="isDialogOpen"
    :before-close="closeDialog"
  >
    <el-button
      type="danger"
      @click="logout"
    >
      LOGOUT
    </el-button>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'UserDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isDialogOpen: this.isOpen,
    };
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo', 'authorizeUser']),
    closeDialog() {
      this.$emit('close');
    },
    logout() {
      this.updateUserInfo({});
      this.authorizeUser(false);
      localStorage.userJwt = '';
      this.$router.push({ name: 'home' });
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss">
.userDialog{
}
</style>
