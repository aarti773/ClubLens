const API_URL = `${import.meta.env.VITE_API_URL}/api/notifications`;

export async function getNotifications(token) {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch notifications");
  }

  return data;
}

export async function markNotificationsAsRead(token) {
  const response = await fetch(`${API_URL}/read-all`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to mark notifications as read");
  }

  return data;
}