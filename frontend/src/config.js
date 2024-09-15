const environment = "development"; // Change to 'development' for local
const config = {
  development: {
    API_BASE_URL: "http://167.99.122.113:5000",
  },
  production: {
    API_BASE_URL: "https://phpstack-1106520-4820851.cloudwaysapps.com",
  },
};

export const { API_BASE_URL } = config[environment];
