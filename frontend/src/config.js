const environment = "development"; // Change to 'development' for local
const config = {
  development: {
    API_BASE_URL: "/api",
  },
  production: {
    API_BASE_URL: "/api",
  },
};

export const { API_BASE_URL } = config[environment];
