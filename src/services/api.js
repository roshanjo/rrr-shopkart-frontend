import { apiRequest } from "../api/api";

// ==================================================
// AUTH SERVICES
// ==================================================

export const login = (email, password) =>
  apiRequest("/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const signup = (username, email, password) =>
  apiRequest("/signup/", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });

export const getMe = () => apiRequest("/me/");

export const updateProfile = (data) =>
  apiRequest("/profile/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });


// ==================================================
// PRODUCT SERVICES (DummyJSON)
// ==================================================

export const getProducts = async ({ search = "", category = "all", limit = 12, skip = 0 } = {}) => {
  
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  if (search) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== "all") {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};


// ==================================================
// ORDER SERVICES
// ==================================================

export const getOrders = () => apiRequest("/orders/");
