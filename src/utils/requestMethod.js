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
export async function getRequest(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Network response was not ok: ${response.status} ${response.statusText}`
    );
  }

  // JSON 응답 확인 후 파싱
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    throw new Error("Expected JSON response but received something else");
  }
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
  const response = await fetch(url, defaultOptions);
  return handleResponse(response);
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
