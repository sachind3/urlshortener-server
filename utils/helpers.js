const getClientUrl = () => {
  return process.env.ENVIRONMENT_MODE === "development"
    ? process.env.CLIENT_DEV
    : process.env.CLIENT_PROD;
};
const getServerUrl = () => {
  return process.env.ENVIRONMENT_MODE === "development"
    ? process.env.SERVER_DEV
    : process.env.SERVER_PROD;
};

module.exports = {
  getClientUrl,
  getServerUrl,
};
