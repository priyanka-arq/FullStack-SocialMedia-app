export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginStart = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const rigisterSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

export const follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const unFollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
export const logout = () => ({
  type: "LOGOUT_SUCCESS",
});
