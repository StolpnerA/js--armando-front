<template>
  <card
    v-if="todo"
    :data="todo"
    :selected-item="selectedTodo"
    :loading="todoLoading"
    type="todo"
    @select-item="$emit('select', $event)"
    @create-item="createNewTodo"
    @edit-item="editTodoData"
    @change-status="changeTodoStatus"
    @delete-item="deleteTodoData"
  />
</template>

<script>
import Card from '@/components/common/card/Card.vue';
import {
  getTodo, createTodo, editTodo, deleteTodo,
} from '@/helpers/api';

export default {
  name: 'TodoCard',
  components: {
    Card,
  },
  props: {
    selectedTask: {
      type: Object,
      default: null,
    },
    selectedTodo: {
      type: Object,
      default: null,
    },
  },
  watch: {
    selectedTask(value) {
      this.getTodoData(value.id);
    },
  },
  data() {
    return {
      todoLoading: false,
      todo: null,
    };
  },
  mounted() {
    this.getTodoData(this.selectedTask.id);
  },
  methods: {
    async getTodoData(id) {
      this.todoLoading = true;
      this.todo = await getTodo(id);
      this.todoLoading = false;
    },
    async createNewTodo(description) {
      this.todoLoading = true;
      await createTodo(description, this.selectedTask.id);
      await this.getTodoData(this.selectedTask.id);
    },
    async editTodoData(data) {
      this.selectedTodo = null;
      this.todoLoading = true;
      await editTodo(data);
      await this.getTodoData(this.selectedTask.id);
    },
    async changeTodoStatus(data) {
      this.todoLoading = true;
      await editTodo(data);
      await this.getTodoData(this.selectedTask.id);
    },
    async deleteTodoData(todoId) {
      this.todoLoading = true;
      await deleteTodo(todoId);
      await this.getTodoData(this.selectedTask.id);
    },
  },
};
</script>
