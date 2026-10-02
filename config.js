window.APP_CONFIG = window.APP_CONFIG || {
  // Local previews use their own backend. GitHub Pages uses the deployed API.
  API_BASE_URL: ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)
    ? "/api"
    : "https://hunan-mandarin-api.onrender.com/api"
};
