import axios from "axios";
import { baseUrl } from "../common/SummaryApi";

// import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
