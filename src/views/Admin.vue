<template>
  <div class="admin">
    <users-card
      :selected-user="selectedUser"
      @select="selectItem({name: 'User', ...$event})" />
    <task-card
      v-if="selectedUser!== null"
      :selected-user="selectedUser"
      :selected-task="selectedTask"
      @select="selectItem({name: 'Task', ...$event})"
    />
    <todo-card
      v-if="selectedTask !== null && selectedUser!== null"
      :selected-user="selectedUser"
      :selected-todo="selectedTodo"
      :selected-task="selectedTask"
      @select="selectItem({name: 'Todo', ...$event})"
    />
  </div>
</template>

<script>
import TaskCard from '@/components/task-page/TaskCard.vue';
import TodoCard from '@/components/task-page/TodoCard.vue';
import UsersCard from '@/components/task-page/UsersCard.vue';

export default {
  name: 'Admin',
  components: {
    TaskCard,
    TodoCard,
    UsersCard,
  },
  data() {
    return {
      selectedTodo: null,
      selectedTask: null,
      selectedUser: null,
    };
  },
  methods: {
    selectItem({ name, index, id }) {
      console.log(name, index, id);
      if (id && index !== undefined) {
        this[`selected${name}`] = { index, id };
      } else {
        this[`selected${name}`] = null;
      }
      if (name === 'User') {
        this.selectedTodo = null;
        this.selectedTask = null;
      }
      if (name === 'Task') {
        this.selectedTodo = null;
      }
    },
  },
};
</script>

<style>
  .admin {
    width: 1150px;
    padding-right: 420px;
    margin: 0 auto;
    display: flex;
  }
</style>
