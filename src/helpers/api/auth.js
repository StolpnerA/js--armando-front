import baseAxios from '@/helpers/baseAxios';

async function registerUser(params) {
  const { data } = await baseAxios({
    method: 'POST',
    url: '/auth/registration',
    data: params,
  });
  return data;
}

async function authUser(params) {
  const { data } = await baseAxios({
    method: 'POST',
    url: '/auth/authorization',
    data: params,
  });
  return data;
}

export {
  registerUser,
  authUser,
};
