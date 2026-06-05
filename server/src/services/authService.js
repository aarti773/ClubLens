const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export async function registerUser(userData) {
  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getEvents() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/events`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getEventMedia(eventId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/media/event/${eventId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function toggleMediaLike(mediaId, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/media/${mediaId}/like`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function addMediaComment(mediaId, text, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/media/${mediaId}/comments`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ text }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function toggleMediaFavourite(
  mediaId,
  token
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/media/${mediaId}/favourite`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getFavouriteMedia(token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/media/favourites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
