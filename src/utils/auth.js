/* =====================================================
   SAVE AUTH TOKEN
===================================================== */
export function saveAuth(token) {

  localStorage.setItem("token", token);

}


/* =====================================================
   LOGOUT USER
===================================================== */
export function logout() {

  localStorage.removeItem("token");
  localStorage.removeItem("cart");

}


/* =====================================================
   CHECK IF USER IS LOGGED IN
===================================================== */
export function isLoggedIn() {

  return !!localStorage.getItem("token");

}


/* =====================================================
   REQUIRE AUTH (REDIRECT IF NOT LOGGED IN)
===================================================== */
export function requireAuth() {

  if (!isLoggedIn()) {
    window.location.href = "/login";
  }

}