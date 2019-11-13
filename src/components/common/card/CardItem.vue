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
    <span v-else>{{ name || description && description.split('\n')[0] }}</span>
    <div
      v-if="!isEdit && type !== 'todo'"
      class="cardItem__icon edit"
      @click.stop="editItem"
    >
      <i class="el-icon-edit" />
    </div>
    <div
      v-if="!isEdit"
      class="cardItem__icon delete"
      @click.stop="deleteItem"
    >
      <i class="el-icon-close" />
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
    editItem() {
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs.itemName.focus();
      });
    },
    confirmEdit() {
      if (this.isEdit) {
        this.$emit('confirm-edit', this.name);
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
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  height: 58px;
  box-sizing: border-box;
  &:hover {
    transition: background-color 0.3s;
    background: #79bbff;
    color: #fff;
  }
  &__icon {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transition: background-color 0.3s;
      background: #fff;
    }
    &.edit {
      right: 35px;
      &:hover {
        color: #333;
      }
    }
    &.delete {
      right: 10px;
      &:hover {
        color: #F56C6C;
      }
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
