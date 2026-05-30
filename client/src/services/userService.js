const API_URL = "http://localhost:5000/api/users";

export async function getAllUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data.users;
}

export async function updateUserRole(userId, role) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update role");
  }

  return data.user;
}