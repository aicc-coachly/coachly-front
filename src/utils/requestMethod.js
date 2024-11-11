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

  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export async function postRequestTwo(url, options) {
  const isFormData = options.body instanceof FormData;

  const defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 형식으로 요청 보내기
    },
    body: isFormData ? options.body : JSON.stringify(options.body), // 객체일 때 JSON.stringify로 직렬화
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // 응답을 JSON 형식으로 받기
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
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
