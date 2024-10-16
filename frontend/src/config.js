const environment = "production"; // Change to 'development' for local
const config = {
  development: {
    API_BASE_URL: "http://localhost:5000",
  },
  production: {
    API_BASE_URL: "https://dashboard.aztecsolar.com/api",
  },
};

export const { API_BASE_URL } = config[environment];
