<template>
  <div class="editTodo">
    <el-input
      v-model="textAreaText"
      resize="none"
      type="textarea"
      autofocus
    />
    <el-button-group class="editTodo__buttons">
      <el-button
        type="danger"
        @click="cancel"
      >
        Cancel
      </el-button>
      <el-button
        type="primary"
        @click="saveData"
      >
        Save
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'EditTodo',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      textAreaText: this.data && this.data.description,
    };
  },
  watch: {
    data(data) {
      this.textAreaText = data.description;
    },
  },
  methods: {
    saveData() {
      this.$emit('save', {
        description: this.textAreaText,
        todoId: this.data && this.data.id,
        status: this.data && this.data.status,
      });
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss">
.editTodo {
  height: 100%;
  width: 400px;
  position: absolute;
  top: 0;
  right: -440px;
  box-sizing: border-box;

  &__buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
     .el-button {
       width: 100%;
     }
  }
  .el-textarea {
    height: 100%;
    > textarea {
      padding: 20px;
      height: 100%;
      &:first-line {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
