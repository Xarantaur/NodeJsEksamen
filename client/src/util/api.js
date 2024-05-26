export async function fetchGet(url) {
  let data;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    const result = await response.json();
    data = result.data;
  } catch (error) {
    console.error(error);
  }
  return data;
}

export function fetchPost(url, body) {
  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
}

export function fetchPatch(url, body) {
  return fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));
}

export async function fetchSession(url) {
  let user;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    const result = await response.json();
    user = result.data;
  } catch (error) {
    console.error(error);
  }
  return user;
}

export function fetchDelete(url, body) {
  return fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));
}