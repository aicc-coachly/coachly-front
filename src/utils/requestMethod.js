/* ====== Common GET Request Function ====== */
export async function getRequest(url) {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/* ====== Common Post Request Function ====== */
export async function postRequest(url, options) {
  const isFormData = options.body instanceof FormData;

  const defaultOptions = {
    method: "POST",
    ...(!isFormData && {
      headers: {
        "Content-Type": "application/json",
      },
    }),
    ...options,
  };

  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/* ====== Common Patch Request Function ====== */
export async function patchRequest(url, options) {
  const defaultOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/* ====== Common Delete Request Function ====== */
export async function deleteRequest(url, options) {
  return await fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.status !== 204) {
      return response.json();
    }
    return response;
  });
}
