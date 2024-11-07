/* ====== Common GET Request Function ====== */
export async function getRequest(url) {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

/* ====== Common Post Request Function ====== */
export async function postRequest(url, data = {}, options = {}) {
  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // data를 JSON으로 변환하여 본문에 포함
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

/* ====== Common Patch Request Function ====== */
export async function patchRequest(url, options) {
  return await fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

/* ====== Common Delete Request Function ====== */
export async function deleteRequest(url, options) {
  return await fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.status !== 204) {
      return response.json();
    }
    return response;
  });
}
