import baseAxios from '@/helpers/baseAxios';

async function getTasks() {
  const { data } = await baseAxios({
    method: 'GET',
    url: '/tasks',
  });
  return data;
}

async function getTasksByUserId(id) {
  const { data } = await baseAxios({
    method: 'GET',
    url: `/admin/tasks/user/${id}`,
  });
  return data;
}

async function createTask(name) {
  const { data } = await baseAxios({
    method: 'POST',
    url: '/tasks',
    data: {
      name,
    },
  });
  return data;
}

async function editTask({ name, id }) {
  const { data } = await baseAxios({
    method: 'PUT',
    url: `/tasks/${id}`,
    data: {
      name,
    },
  });
  return data;
}

async function deleteTask(id) {
  const { data } = await baseAxios({
    method: 'DELETE',
    url: `/tasks/${id}`,
  });
  return data;
}

export {
  getTasks,
  getTasksByUserId,
  createTask,
  editTask,
  deleteTask,
};
