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
    selectItem({
      name, index, id, clear,
    }) {
      if (id && index !== undefined) {
        this[`selected${name}`] = { index, id };
      } else {
        this[`selected${name}`] = null;
      }
      if (name === 'Task') {
        this.selectedTodo = null;
      }
      if (name === 'Todo' && clear) {
        this.selectedTask = null;
      }
    },
  },
};
</script>

<style lang="scss">
  .tasks {
    position: relative;
    width: 780px;
    padding-right: 375px;
    margin: 0 auto;
    display: flex;
  }
@media all and (max-width: 1200px) {
  .tasks {
    width: 360px;
    padding: 0;
    .card {
      position: absolute;
      left: 0;
      margin: 0;
    }
  }
}
</style>
