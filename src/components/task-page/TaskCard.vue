<template>
  <card
    v-if="tasks"
    :data="tasks"
    :selected-item="selectedTask"
    :loading="tasksLoading"
    type="task"
    @select-item="$emit('select', $event)"
    @create-item="createNewTask"
    @edit-item="editTaskData"
    @change-status="changeTaskStatus"
    @delete-item="deleteTaskData"
    @get-data="getTasksData"
  />
</template>

<script>
import Card from '@/components/common/card/Card.vue';
import {
  getTasks, createTask, editTask, deleteTask, getTasksByUserId,
} from '@/helpers/api';

export default {
  name: 'TaskCard',
  components: {
    Card,
  },
  props: {
    selectedUser: {
      type: Object,
      default: null,
    },
    selectedTask: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tasksLoading: false,
      tasks: [],
      selectedTodo: null,
    };
  },
  watch: {
    selectedUser: {
      async handler(value) {
        this.tasks = await getTasksByUserId(value.id);
      },
      deep: true,
    },
  },
  mounted() {
    this.getTasksData();
  },
  methods: {
    clearTask() {
      this.todo = [];
      this.$emit('select', null);
      this.selectedTodo = null;
    },
    async getTasksData() {
      this.tasksLoading = true;
      this.tasks = this.$route.name === 'admin' && this.selectedUser
        ? await getTasksByUserId(this.selectedUser.id)
        : await getTasks();
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
  },
};
</script>
