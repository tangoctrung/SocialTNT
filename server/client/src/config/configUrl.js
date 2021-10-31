import axios from "axios";

export const axiosInstance = axios.create({
    baseUrl: "https://macabre-cemetery-90614.herokuapp.com/"
});