import axios from "axios";

export const axiosInstance = axios.create({
    baseUrl: "https://socialtntv0.herokuapp.com/api"
});