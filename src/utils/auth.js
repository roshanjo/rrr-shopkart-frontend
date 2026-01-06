export function saveAuth(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("cart");
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "/login";
  }
}
