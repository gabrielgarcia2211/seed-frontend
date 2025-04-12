import * as reportApi from "../api/report";

export const ReportService = {
  getReportJson: async () => await reportApi.getReportJson(),
};