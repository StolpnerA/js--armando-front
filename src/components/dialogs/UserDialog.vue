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
        :value="user.email"
        placeholder="Email"
        disabled
      />
    </div>
    <div class="userDialog__blockInput">
      <span>Role</span>
      <el-select
        :value="selectedRole"
        placeholder="Role"
        :disabled="!isChangeUserByAdmin"
        @change="handlerInput('selectedRole', $event)"
      >
        <el-option
          v-for="item in roles"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </div>
    <div class="userDialog__blockInput">
      <span>Position</span>
      <el-select
        :value="selectedPosition"
        placeholder="Position"
        :disabled="!isChangeUserByAdmin"
        @change="handlerInput('selectedPosition', $event)"
      >
        <el-option
          v-for="item in positions"
          :key="item"
          :value="item"
        />
      </el-select>
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
    <div
      v-if="!isChangeUserByAdmin"
      class="userDialog__blockInput"
    >
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
        v-if="!isChangeUserByAdmin"
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
import { ROLES, POSITIONS } from '@/constants';

export default {
  name: 'UserDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    isChangeUserByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDialogOpen: this.isOpen,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      selectedRole: this.user.role,
      selectedPosition: this.user.position,
      password: '',
      passwordError: false,
      roles: ROLES,
      positions: POSITIONS,
    };
  },
  computed: {
    isChanged() {
      return this.firstName !== this.user.firstName
        || this.lastName !== this.user.lastName
        || this.selectedRole !== this.user.role
        || this.selectedPosition !== this.user.position
        || this.password;
    },
  },
  methods: {
    handlerInput(field, value) {
      this[field] = value;
    },
    closeDialog() {
      this.$emit('close');
    },
    logout() {
      this.$emit('logout');
    },
    async save() {
      this.passwordError = this.password.length !== 0 && this.password.length < 8;
      if (this.passwordError) return;

      this.$emit('update', {
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password || undefined,
        role: this.selectedRole,
        position: this.selectedPosition,
      });
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
