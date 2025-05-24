export async function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const response = await fetch("http://localhost:3001/check-auth", {
    headers: {
      Authorization: `Bearer ${token}`,
      credentials: "include",
    },
  });

  if (response.status === 401) {
    return false;
  }
  return true;
}
