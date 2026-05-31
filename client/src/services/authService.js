const API_URL = "http://localhost:5000/api/auth";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getEvents() {
  const response = await fetch("http://localhost:5000/api/events");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getEventById(eventId) {
  const response = await fetch(
    `http://localhost:5000/api/events/${eventId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getEventMedia(eventId) {
  const token = localStorage.getItem("token");

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `http://localhost:5000/api/media/event/${eventId}`,
    {
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function uploadEventMedia(
  formData,
  token
) {
  const response = await fetch(
    "http://localhost:5000/api/media/upload",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteEventMedia(
  mediaId,
  token
) {
  const response = await fetch(
    `http://localhost:5000/api/media/${mediaId}`,
    {
      method: "DELETE",

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

export async function createEvent(
  eventData,
  token
) {
  const response = await fetch(
    "http://localhost:5000/api/events",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(eventData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function toggleMediaLike(
  mediaId,
  token
) {
  const response = await fetch(
    `http://localhost:5000/api/media/${mediaId}/like`,
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

export async function addMediaComment(
  mediaId,
  text,
  token
) {
  const response = await fetch(
    `http://localhost:5000/api/media/${mediaId}/comments`,
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
    `http://localhost:5000/api/media/${mediaId}/favourite`,
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

export async function searchMedia(query) {
  const response = await fetch(
    `http://localhost:5000/api/media/search?query=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getAllGalleryMedia() {
  const eventsData = await getEvents();

  const allMediaResponses = await Promise.all(
    eventsData.events.map(async (event) => {
      const mediaList = await getEventMedia(
        event._id
      );

      return mediaList.map((media) => ({
        ...media,
        eventTitle: event.title,
      }));
    })
  );

  return allMediaResponses.flat();
}