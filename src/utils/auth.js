export const setAuth = (token, name) => {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
};
