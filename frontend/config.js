const config = {
  API_BASE_PROTOCOL: "http",
  API_BASE_HOST: "localhost",
  API_BASE_PORT: "5000",
  API_BASE_PREFIX: "/v1/stuff/",
  getApiBaseDocsUrl: function () {
    return `${this.API_BASE_PROTOCOL}://${this.API_BASE_HOST}:${this.API_BASE_PORT}/docs`;
  },
  getApiBaseUrl: function () {
    return `${this.API_BASE_PROTOCOL}://${this.API_BASE_HOST}:${this.API_BASE_PORT}${this.API_BASE_PREFIX}`;
  },
};

export default config;
