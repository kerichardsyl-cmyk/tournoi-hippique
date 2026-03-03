// Netlify Function — Proxy API PMU (contourne les restrictions CORS)
exports.handler = async function (event) {
  const path = event.queryStringParameters?.path || "";
  const baseUrl = "https://offline.pmu.fr/offline/rest";
  const url = `${baseUrl}/${path}`;

  try {
    const fetch = (...args) =>
      import("node-fetch").then(({ default: f }) => f(...args));

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `PMU API error: ${response.status}` }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
