import baseAxios from '@/helpers/baseAxios';

async function getUserInfo() {
  const { data } = await baseAxios({
    method: 'GET',
    url: '/user',
  });
  return data;
}

async function getUsers() {
  const { data } = await baseAxios({
    method: 'GET',
    url: '/admin/users',
  });
  return data;
}

async function editUser({ firstName, lastName, password }) {
  const { data } = await baseAxios({
    method: 'PUT',
    url: '/user/edit',
    data: {
      firstName,
      lastName,
      password,
    },
  });
  return data;
}

export {
  getUserInfo,
  getUsers,
  editUser,
};
