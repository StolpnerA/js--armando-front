<template>
  <el-card
    v-loading="loading"
    class="card"
  >
    <div class="card__title">
      <span
        v-if="$route.name === 'tasks' ? type !== 'task' : type !== 'user'"
        @click="back"
      >
        <i class="el-icon-arrow-left" />
      </span>
      {{ type }}s
    </div>
    <div
      v-if="newCardItem"
      class="card__edit"
    >
      <el-input
        ref="newCardItemInput"
        v-model="newCardItemName"
        @blur="addCardItem"
        @keydown.enter.native="addCardItem"
      />
    </div>
    <div
      v-else-if="type !== 'user' && $route.name !== 'admin'"
      class="card__add"
      @click="addNewCardItem"
    >
      +
    </div>
    <div class="card__list">
      <div
        v-for="(item, index) in sortedData"
        :key="'cardItem_'+item._id"
        @click="itemClick(index, item)"
      >
        <card-item
          :type="type"
          :data="item"
          :selected="selectedItem && selectedItem.index === index"
          @delete="removeCardItem(item._id)"
          @change-status="changeStatusCardItem"
          @confirm-edit="confirmEditCardItem($event, item._id)"
        />
      </div>
    </div>
    <edit-todo
      v-if="editDescriptionOpen && (selectedItem || addNewTodo)"
      :data="editDescriptionData"
      @save="saveItem"
      @cancel="cancelEditItem"
    />
  </el-card>
</template>

<script>
import CardItem from '@/components/common/card/CardItem.vue';
import EditTodo from '@/components/EditTodo.vue';

export default {
  name: 'Card',
  components: {
    CardItem,
    EditTodo,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    selectedItem: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      editDescriptionOpen: false,
      editDescriptionData: {},
      addNewTodo: false,
      newCardItem: false,
      newCardItemName: '',
      cardItems: this.data || [],
    };
  },
  computed: {
    sortedData() {
      const { data } = this;
      return data.reverse();
    },
  },
  methods: {
    itemClick(index, item) {
      switch (this.type) {
        // eslint-disable-next-line no-underscore-dangle
        case 'todo': this.editDescription(item.description, item._id, item.status);
          // eslint-disable-next-line no-underscore-dangle
          this.selectItem(index, item._id);
          break;
        // eslint-disable-next-line no-underscore-dangle
        case 'task': this.selectItem(index, item._id);
          break;
        // eslint-disable-next-line no-underscore-dangle
        case 'user': this.selectItem(index, item._id);
          break;
        default: this.selectItem(index, item);
      }
    },
    addNewCardItem() {
      if (this.type === 'todo') {
        this.editDescriptionData = null;
        this.editDescriptionOpen = false;
        this.addNewTodo = true;
        this.$nextTick(() => {
          this.openEditDescription();
        });
      } else {
        this.newCardItem = true;
        this.$nextTick(() => {
          this.$refs.newCardItemInput.focus();
        });
      }
    },
    saveItem({ description, todoId, status }) {
      if (this.editDescriptionData) {
        if (description) {
          this.$emit('edit-item', { description, todoId, status });
        }
      } else if (description) {
        this.addNewTodo = false;
        this.$emit('create-item', description);
      }
      this.editDescriptionOpen = false;
    },
    cancelEditItem() {
      this.editDescriptionOpen = false;
      this.editDescriptionData = {};
    },
    openEditDescription() {
      this.editDescriptionOpen = true;
    },
    addCardItem() {
      if (this.newCardItem) {
        if (this.newCardItemName) {
          this.$emit('create-item', this.newCardItemName);
        }
        this.$nextTick(() => {
          this.newCardItem = false;
          this.newCardItemName = '';
        });
      }
    },
    removeCardItem(id) {
      this.editDescriptionOpen = false;
      this.$emit('delete-item', id);
    },
    changeStatusCardItem(data) {
      this.$emit('change-status', data);
    },
    confirmEditCardItem(data, id) {
      this.$emit('edit-item', { name: data.name, id });
    },
    editDescription(description, id, status) {
      this.editDescriptionData = { description, id, status };
      this.$nextTick(() => {
        this.openEditDescription();
      });
    },
    back() {
      this.$emit('select-item', { clear: true });
    },
    selectItem(index, id) {
      this.$emit('select-item', { index, id });
    },
  },
};
</script>

<style lang="scss">
.card {
  min-width: 360px;
  box-sizing: border-box;
  margin: 15px;
  overflow: visible;
  position: relative;
  height: 70vh;
  max-height: 70vh;
  &__title {
    background: #fff;
    position: absolute;
    top: -30px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    line-height: 20px;
    span {
      display: none;
      cursor: pointer;
      position: absolute;
      left: 0;
      line-height: 20px;
      font-size: 20px;
    }
  }
  .el-card__body {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &__list {
    height: 100%;
    overflow: auto;
  }
  &__edit {
    height: 58px;
    .el-input {
      height: 100%;
      input {
        font-size: 16px;
        padding: 20px;
        border: none;
        border-radius: 0;
        height: 100%;
      }
    }
  }
  &__add {
    user-select: none;
    text-align: center;
    min-height: 50px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: #fff;
      background: #409EFF
    }
  }
}
@media all and (max-width: 1200px) {
  .card {
    &__title {
      span {
        display: block;
      }
    }
  }
}
</style>
