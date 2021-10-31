import axios from "axios";

export const axiosInstance = axios.create({
    baseUrl: "https://socialtnt.herokuapp.com/api"
});