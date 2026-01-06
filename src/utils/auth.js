export const setAuth = (token) => {
  localStorage.setItem("token", token);
};

export const getAuth = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
