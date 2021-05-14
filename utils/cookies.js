import cookies from 'js-cookie';

export const getAccessToken = () => {
  const cookie = cookies.get('accessToken');
  if (!cookie) {
    return;
  }
  return JSON.stringify(cookie).replace(/\"/g, '');
};

export const setAccessToken = (user) => {
  cookies.set('accessToken', user.accessToken, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  });
};

export const removeAccessToken = () => cookies.remove('accessToken');

export const getRefreshToken = () => {
  const cookie = cookies.get('refreshToken');
  if (!cookie) {
    return;
  }
  return JSON.stringify(cookie).replace(/\"/g, '');
};

export const setRefreshToken = (user) => {
  cookies.set('refreshToken', user.refreshToken, {
    // firebase refresh tokens expire in one day
    // set cookie expiry to match
    expires: 24,
  });
};

export const removeRefreshToken = () => cookies.remove('refreshToken');

