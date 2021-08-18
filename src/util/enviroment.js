import env from "react-dotenv";

export const enviroment = () => {
  let baseUrl = process.env.REACT_APP_API_LOCAL;
  switch (process.env.NODE_ENV) {
    case "development":
      baseUrl = process.env.REACT_APP_API_DEV;
      break;
    case "production":
      baseUrl = process.env.REACT_APP_API_PRODUCTION;
      break;

    default:
      break;
  }
  return baseUrl
};
