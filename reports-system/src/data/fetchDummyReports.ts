import { Report, reportSchema } from "../types/types";

let data = [
  {
    id: "1",
    title: "Traffic light malfunction",
    location: { lat: 31.9566, lng: 35.9457 },
    importance: "high",
    type: "signal",
    description:
      "The traffic light near the Interior Circle has been out since the morning.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Roadworks on the street",
    location: { lat: 31.9632, lng: 35.9305 },
    importance: "medium",
    type: "roadwork",
    description: "Roadworks in front of the University of Jordan street.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Car accident",
    location: { lat: 31.95, lng: 35.9333 },
    importance: "high",
    type: "accident",
    description: "Two-car accident on Mecca Street.",
    createdAt: new Date().toISOString(),
  },
];

export const fetchDummyReports = async (id?: string) => {
  if (id) {
    return data.find((report) => report.id === id) || null;
  }
  return data;
};

export const addReport = async (report: Report) => {
  const validReport = reportSchema.parse(report); 
  data.push(validReport);
  return validReport;
};

export const deleteReport = async (id: string) => {
  data = data.filter((report) => report.id !== id);
  return true;
};
