import { apiMicroservice } from "../axios";

export const getReportJson = () => apiMicroservice.get("/report");