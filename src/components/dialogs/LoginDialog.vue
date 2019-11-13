<template>
  <el-dialog
    class="loginDialog"
    title="Login"
    :visible="isDialogOpen"
    :before-close="closeDialog"
  >
    <el-tabs
      v-model="activeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        label="Register"
        name="Register"
      >
        <el-input
          v-model="firstName"
          placeholder="First Name"
        />
        <el-input
          v-model="lastName"
          placeholder="Last Name"
        />
        <el-select
          v-model="position"
          placeholder="Position"
        >
          <el-option
            v-for="item in positions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input
          v-model="email"
          :class="{error: emailError}"
          placeholder="E-mail"
        />
        <el-input
          v-model="password"
          :class="{error: passwordError}"
          placeholder="Password"
          show-password
        />
        <el-button @click="register">
          Register
        </el-button>
      </el-tab-pane>
      <el-tab-pane
        label="Auth"
        name="Auth"
      >
        <el-input
          v-model="email"
          :class="{error: emailError}"
          placeholder="E-mail"
        />
        <el-input
          v-model="password"
          :class="{error: passwordError}"
          placeholder="Password"
          show-password
        />
        <el-button @click="auth">
          Auth
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex';
import validateEmail from '@/helpers/utils';
import { POSITIONS } from '@/constants';
import { registerUser, authUser } from '@/helpers/api';

export default {
  name: 'LoginDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 'Register',
      positions: POSITIONS,
      firstName: '',
      lastName: '',
      position: '',
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      isDialogOpen: this.isOpen,
    };
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo', 'authorizeUser']),
    closeDialog() {
      this.$emit('close');
    },
    tabClick() {
      this.email = '';
      this.password = '';
      this.emailError = '';
      this.passwordError = '';
    },
    saveUserData({ user, token }) {
      localStorage.userJwt = token;
      this.updateUserInfo(user);
      this.authorizeUser(true);
      this.closeDialog();
    },
    async auth() {
      const { email, password } = this;
      this.emailError = !validateEmail(email);
      this.passwordError = !(password.length >= 8);
      const params = { email, password };
      if (!this.emailError && !this.passwordError) {
        const data = await authUser(params);
        this.saveUserData(data);
      }
    },
    async register() {
      const {
        email, password, firstName, lastName, position,
      } = this;
      this.emailError = !validateEmail(email);
      this.passwordError = !(password.length >= 8);
      const params = {
        firstName,
        lastName,
        position,
        email,
        password,
      };
      if (!this.emailError && !this.passwordError) {
        const data = await registerUser(params);
        this.saveUserData(data);
      }
    },
  },
};
</script>

<style lang="scss">
.loginDialog{
  .el-dialog {
    width: 400px;
  }
  .el-tabs {
    .el-tab-pane {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .el-input {
    width: 300px;
    margin-bottom: 10px;
    &.error {
      input {
        border-color: #F56C6C;
      }
    }
  }
}
</style>
