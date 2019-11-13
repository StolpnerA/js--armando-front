import baseAxios from '@/helpers/baseAxios';

async function getUserInfo() {
  const { data } = await baseAxios({
    method: 'GET',
    url: '/user',
  });
  return data;
}

async function getAllUsers() {
  const { data } = await baseAxios({
    method: 'GET',
    url: '/user',
  });
  return data;
}

export {
  getUserInfo,
  getAllUsers,
};
