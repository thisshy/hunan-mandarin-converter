window.APP_CONFIG = window.APP_CONFIG || {
  // Local default: same-origin backend at http://127.0.0.1:8080/api
  // For GitHub Pages, set this to your remote backend base URL (must include /api).
  // Example: "https://your-backend.example.com/api"
  API_BASE_URL: "/api",
  // Demo lexicon file used when backend is unreachable.
  DEMO_LEXICON_URL: "./server/data/default-lexicon.json"
};
