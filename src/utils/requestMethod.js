/* ====== Helper Function for Response Check ====== */
async function handleResponse(response) {
  if (!response.ok) {
    const errorMessage = `Network response was not ok (Status: ${response.status})`;
    throw new Error(errorMessage);
  }
  // `204 No Content` 상태인 경우 JSON 변환을 건너뜁니다.
  return response.status !== 204 ? await response.json() : response;
}

/* ====== Common GET Request Function ====== */
export async function getRequest(url, options = {}) {
  const response = await fetch(url, { method: 'GET', ...options });
  return handleResponse(response);
}

/* ====== Common POST Request Function ====== */
export async function postRequest(url, data = {}, options = {}) {
  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  };
  const response = await fetch(url, defaultOptions);
  return handleResponse(response);
}

/* ====== Common PATCH Request Function ====== */
export async function patchRequest(url, data = {}, options = {}) {
  const defaultOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  };
  const response = await fetch(url, defaultOptions);
  return handleResponse(response);
}

/* ====== Common DELETE Request Function ====== */
export async function deleteRequest(url, options = {}) {
  const defaultOptions = {
    method: 'DELETE',
    ...options,
  };
  const response = await fetch(url, defaultOptions);
  return handleResponse(response);
}
