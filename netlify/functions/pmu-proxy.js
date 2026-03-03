exports.handler = async function (event) {
  const path = event.queryStringParameters?.path || "";
  const baseUrls = [
    "https://online.pmu.fr/rest/online",
    "https://turfinfo.api.pmu.fr/rest/client/1",
    "https://offline.pmu.fr/offline/rest",
  ];
  const fetch = (...args) =>
    import("node-fetch").then(({ default: f }) => f(...args));
  for (const base of baseUrls) {
    const url = `${base}/${path}`;
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": "https://www.pmu.fr/",
          "Origin": "https://www.pmu.fr",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify(data),
        };
      }
    } catch (err) { continue; }
  }
  return {
    statusCode: 500,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ error: "URLs PMU inaccessibles" }),
  };
};
