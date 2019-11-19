<template>
  <el-dialog
    class="userDialog"
    title="User Info"
    :visible="isDialogOpen"
    :before-close="closeDialog"
    width="400px"
  >
    <div class="userDialog__blockInput">
      <span>Email</span>
      <el-input
        :value="user.userInfo.email"
        placeholder="Email"
        disabled
      />
    </div>
    <div class="userDialog__blockInput">
      <span>Role</span>
      <el-input
        :value="user.userInfo.role"
        placeholder="Role"
        disabled
      />
    </div>
    <div class="userDialog__blockInput">
      <span>Position</span>
      <el-input
        :value="user.userInfo.position"
        placeholder="Position"
        disabled
      />
    </div>
    <div class="userDialog__blockInput">
      <span>First Name</span>
      <el-input
        :value="firstName"
        placeholder="First Name"
        @input="handlerInput('firstName', $event)"
      />
    </div>
    <div class="userDialog__blockInput">
      <span>Last Name</span>
      <el-input
        :value="lastName"
        placeholder="Last Name"
        @input="handlerInput('lastName', $event)"
      />
    </div>
    <div class="userDialog__blockInput">
      <span>Password</span>
      <el-input
        :value="password"
        :class="{error: passwordError}"
        placeholder="Password"
        show-password
        @input="handlerInput('password', $event)"
      />
    </div>
    <div class="userDialog__action">
      <el-button
        v-if="isChanged"
        type="success"
        @click="save"
      >
        Save
      </el-button>
      <el-button
        class="userDialog__action_logout"
        type="danger"
        @click="logout"
      >
        LOGOUT
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { editUser } from '@/helpers/api';

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
      firstName: null,
      lastName: null,
      password: '',
      passwordError: false,
    };
  },
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
    isChanged() {
      return this.firstName !== this.user.userInfo.firstName
        || this.lastName !== this.user.userInfo.lastName
        || this.password;
    },
  },
  mounted() {
    this.firstName = this.user.userInfo.firstName;
    this.lastName = this.user.userInfo.lastName;
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo', 'authorizeUser']),
    handlerInput(field, value) {
      this[field] = value;
    },
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
    async save() {
      this.passwordError = this.password.length !== 0 && this.password.length < 8;
      if (this.passwordError) return;
      const user = await editUser({
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password || undefined,
      });
      this.updateUserInfo(user);
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss">
.userDialog {
  &__action {
    display: flex;

    .el-button.userDialog__action_logout {
      margin-left: auto;
    }
  }

  &__blockInput {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    span {
      font-size: 12px;
    }
  }

  .el-input {
    &.error {
      input {
        border-color: #F56C6C;
      }
    }
  }
}
</style>
