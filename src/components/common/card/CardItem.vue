<template>
  <div
    class="cardItem"
    :class="{edit: isEdit, selected}"
  >
    <el-input
      v-if="isEdit"
      ref="itemName"
      v-model="name"
      @blur="confirmEdit"
      @keypress.enter.native="confirmEdit"
    />
    <div
      v-else
      class="cardItem__text"
    >
      <div
        v-if="type === 'todo'"
        class="cardItem__icon check"
        @click.stop="changeItemStatus"
      >
        <i
          v-if="data.status"
          class="el-icon-check"
        />
      </div>
      <div
        class="cardItem__text-name"
        @click="$emit('item-click')"
      >
        {{ getItemName() }}
        <span
          v-if="data.createdAt"
          class="cardItem__text-createdAt"
        >
          created at: {{ formatDate(new Date(data.createdAt)) }}
        </span>
        <span
          v-if="data.changedAt"
          class="cardItem__text-changedAt"
        >
          changed at: {{ formatDate(new Date(data.changedAt)) }}
        </span>
      </div>
      <div
        v-if="!isEdit && type !== 'todo'"
        class="cardItem__icon edit"
        @click.stop="editItem"
      >
        <i class="el-icon-edit" />
      </div>
      <div
        v-if="!isEdit && type !== 'user'"
        class="cardItem__icon delete"
        @click.stop="deleteItem"
      >
        <i class="el-icon-close" />
      </div>
    </div>
    <user-dialog
      v-if="isUserDialogOpen"
      :is-open="isUserDialogOpen"
      :user="data"
      is-change-user-by-admin
      @update="updateUser"
      @close="isUserDialogOpen = false"
    />
  </div>
</template>

<script>
import { format } from 'date-fns';
import UserDialog from '@/components/dialogs/UserDialog.vue';
import { editUserByAdmin } from '@/helpers/api';
import { DATETIME_FORMAT_SLASH } from '@/constants';

export default {
  name: 'CardItem',
  components: {
    UserDialog,
  },
  props: {
    type: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: this.data.name,
      description: this.data.description,
      isEdit: false,
      isUserDialogOpen: false,
    };
  },
  watch: {
    data(value) {
      this.description = value.description;
      this.name = value.name;
    },
  },
  methods: {
    getItemName() {
      const { name, description } = this;
      const { firstName, lastName, email } = this.data;
      if (name) {
        return name;
      }
      if (description) {
        return description.split('\n')[0];
      }
      if (email && firstName && lastName) {
        return `${firstName} ${lastName} ${email}`;
      }
      return '';
    },
    editItem() {
      if (this.type === 'user') {
        this.isUserDialogOpen = true;
      } else {
        this.isEdit = true;
        this.$nextTick(() => {
          this.$refs.itemName.focus();
        });
      }
    },
    changeItemStatus() {
      this.$emit('change-status', {
        // eslint-disable-next-line no-underscore-dangle
        todoId: this.data._id,
        status: !this.data.status,
        description: this.data.description,
      });
    },
    confirmEdit() {
      if (this.isEdit) {
        this.$emit('confirm-edit', {
          status: !this.data.status,
          name: this.name,
          description: this.description,
        });
        this.isEdit = false;
      }
    },
    deleteItem() {
      this.$emit('delete');
    },
    async updateUser(value) {
      // eslint-disable-next-line
      await editUserByAdmin(this.data._id, value);
      this.$emit('update-user-data');
      this.isUserDialogOpen = false;
    },
    formatDate(date) {
      return format(
        date,
        DATETIME_FORMAT_SLASH,
      );
    },
  },
};
</script>

<style lang="scss">
.cardItem {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid #ddd;

  &__text {
    width: 100%;
    display: flex;
    &-name {
      width: 100%;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 50px;
      padding: 0 20px;
      height: 50px;
      position: relative;

      &:hover {
        transition: background-color 0.3s;
        background: #79bbff;
        color: #fff;
      }
    }

    &-createdAt {
      position: absolute;
      top: 15px;
      left: 20px;
      font-size: 8px;
    }

    &-changedAt {
      position: absolute;
      top: -15px;
      left: 20px;
      font-size: 8px;
    }
  }
  &__icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: #333;
    height: 50px;
    min-width: 50px;

    &:hover {
      transition: background-color 0.3s;
      background: #fff;
    }
    &.check {
      border-right: 1px solid #ddd;
      &:hover {
        background: #ddd;
      }
    }
    &.edit {
      &:hover {
        color: #333;
      }
    }
    &.delete {
      color: #fff;
      background: #F56C6C;
    }
  }
  &.edit {
    padding: 0;
  }
  &.selected {
    background: #409EFF;
    color: #fff;
  }
  > .el-input {
    height: 100%;
      input {
        background: #79bbff;
        color: #fff;
        height: 100%;
        padding: 20px;
        border: none;
        border-radius: 0;
        font-size: 16px;
      }
    }
}
</style>
