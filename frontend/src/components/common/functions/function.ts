export function getToken() {
  console.log(localStorage.getItem("access-token"));
  return localStorage.getItem("access-token");
}

export function getToken1() {
  return localStorage.getItem("access-token");
}
