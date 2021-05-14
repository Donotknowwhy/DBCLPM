export const mapAccessToken = (user) => {
  const {ya} = user;
  return {
    accessToken: ya,
  };
};

export const mapRefreshToken = (user) => {
  const {refreshToken} = user;
  return {
    refreshToken,
  };
};

export const mapUserData = (user) => {
  const {email, photoURL} = user;
  return {
    email,
    photoURL,
  };
};
