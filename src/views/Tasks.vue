<template>
  <div class="tasks">
    <task-card
      :selected-task="selectedTask"
      @select="selectItem({name: 'Task', ...$event})"
    />
    <todo-card
      v-if="selectedTask !== null"
      :selected-todo="selectedTodo"
      :selected-task="selectedTask"
      @select="selectItem({name: 'Todo', ...$event})"
    />
  </div>
</template>

<script>
import TaskCard from '@/components/task-page/TaskCard.vue';
import TodoCard from '@/components/task-page/TodoCard.vue';


export default {
  name: 'Tasks',
  components: {
    TaskCard,
    TodoCard,
  },
  data() {
    return {
      selectedTodo: null,
      selectedTask: null,
    };
  },
  methods: {
    selectItem({ name, index, id }) {
      if (id && index !== undefined) {
        this[`selected${name}`] = { index, id };
      } else {
        this[`selected${name}`] = null;
      }
      if (name === 'Task') {
        this.selectedTodo = null;
      }
    },
  },
};
</script>

<style>
  .tasks {
    display: flex;
  }
</style>
