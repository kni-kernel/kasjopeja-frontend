import axios from "axios";

const options = {
  baseURL: process.env.VUE_APP_API_URL
};

export default axios.create(options);
