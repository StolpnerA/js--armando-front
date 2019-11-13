import baseAxios from '@/helpers/baseAxios';

async function getTodo(taskId) {
  const { data } = await baseAxios({
    method: 'GET',
    url: `/todo/task/${taskId}`,
  });
  return data;
}

async function createTodo(description, taskId) {
  const { data } = await baseAxios({
    method: 'POST',
    url: `/todo/task/${taskId}`,
    data: { description },
  });
  return data;
}

async function editTodo(description, todoId) {
  const { data } = await baseAxios({
    method: 'PUT',
    url: `/todo/${todoId}`,
    data: { description },
  });
  return data;
}

async function deleteTodo(todoId) {
  const { data } = await baseAxios({
    method: 'DELETE',
    url: `/todo/${todoId}`,
  });
  return data;
}

export {
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
};
