<template>
  <el-card
    v-loading="loading"
    class="card"
  >
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
      v-else
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
      if (this.type === 'todo') {
        // eslint-disable-next-line
        this.editDescription(item.description, item._id, item.status);
      }
      // eslint-disable-next-line
      this.selectItem(index, item._id);
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
    selectItem(index, id) {
      this.$emit('select-item', { index, id });
    },
  },
};
</script>

<style lang="scss">
.card {
  width: 400px;
  margin: 20px;
  overflow: visible;
  position: relative;
  max-height: 70vh;
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
</style>
