async function sendAPIRequest(method = "GET", url = "", data = {}) {
    // Default options are marked with *
    const token = localStorage.getItem('token');

    const headers = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(headers);

    const options = {
      method: method.toUpperCase(),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
  
    if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
      options.body = JSON.stringify(data);
    }
  
    const response = await fetch(url, options);
    const jsonBaba = {
        code: response.status,
        data: await response.json(),
    };
    return jsonBaba
  }
  export default sendAPIRequest;