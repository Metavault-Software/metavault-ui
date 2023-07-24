import axios from "axios";

var axiosInstance = axios.create({
  baseURL: "https://valid-actor-393616.uc.r.appspot.com/api/v1"
});

export default axiosInstance;