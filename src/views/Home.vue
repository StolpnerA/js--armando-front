<template>
  <div class="home">
    <div class="home__cards">
      <card
        v-if="tasks"
        :data="tasks"
        :selected-item="selectedTask"
        :loading="tasksLoading"
        @select-item="selectItem({name: 'Task', ...$event})"
        @create-item="createNewTask"
        @edit-item="editTaskData"
        @change-status="changeTaskStatus"
        @delete-item="deleteTaskData"
        @get-data="getTasksData"
      />
      <card
        v-if="selectedTask !== null && todo"
        :data="todo"
        :selected-item="selectedTodo"
        :loading="todoLoading"
        type="todo"
        @select-item="selectItem({name: 'Todo', ...$event})"
        @create-item="createNewTodo"
        @edit-item="editTodoData"
        @change-status="changeTodoStatus"
        @delete-item="deleteTodoData"
        @get-data="getTasksData"
      />
    </div>
  </div>
</template>

<script>
import Card from '@/components/common/card/Card.vue';
import {
  getTasks, createTask, editTask, deleteTask, getTodo, createTodo, editTodo, deleteTodo,
} from '@/helpers/api';

export default {
  name: 'Home',
  components: {
    Card,
  },
  data() {
    return {
      selectedTask: null,
      selectedTodo: null,
      tasksLoading: false,
      todoLoading: false,
      todo: null,
      tasks: null,
    };
  },
  async mounted() {
    this.$store.subscribe(async (mutation, state) => {
      if (mutation.type === 'user/authorizeUser' && state.user.isAuthorized) {
        await this.getTasksData();
      }
    });
  },
  methods: {
    clearTask() {
      this.todo = [];
      this.selectedTask = null;
      this.selectedTodo = null;
    },
    async getTasksData() {
      this.tasksLoading = true;
      this.tasks = await getTasks();
      this.tasksLoading = false;
    },
    async createNewTask(name) {
      this.clearTask();
      this.tasksLoading = true;
      await createTask(name);
      this.getTasksData();
    },
    async editTaskData(data) {
      this.tasksLoading = true;
      await editTask(data);
      this.getTasksData();
    },
    async changeTaskStatus(data) {
      this.tasksLoading = true;
      await editTask(data);
      this.getTasksData();
    },
    async deleteTaskData(id) {
      this.clearTask();
      this.tasksLoading = true;
      await deleteTask(id);
      this.getTasksData();
    },
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
    async selectItem({ name, id, index }) {
      this[`selected${name}`] = { index, id };
      if (name === 'Task') {
        this.getTodoData(id);
      }
    },
  },
};
</script>

<style lang="scss">
.home {
  &__cards {
    display:grid;
    justify-content: center;
    grid-template-columns: repeat(3, 400px);
    grid-column-gap: 40px;
    grid-template-rows: 75vh;
  }
}
</style>
