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
          class="el-icon-check" />
      </div>
      <div class="cardItem__text-name">
        {{ getItemName() }}
      </div>
      <div
        v-if="!isEdit && type === 'task' "
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
  </div>
</template>

<script>
export default {
  name: 'CardItem',
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
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs.itemName.focus();
      });
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
  },
};
</script>

<style lang="scss">
.cardItem {
  width: 400px;
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
      &:hover {
        transition: background-color 0.3s;
        background: #79bbff;
        color: #fff;
      }
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
  .el-input {
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
