import { Report } from "@/types/types";

export async function fetchReports(): Promise<Report[]> {
  const response = await fetch("http://localhost:5298/api/Report");

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  const data = await response.json();
  return data;
}

export async function fetchReportById(id: number) {
  const response = await fetch(`http://localhost:5298/api/Report/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch report with id ${id}`);
  }
  const data = await response.json();
  return data;
}

export async function deleteReport(id: number): Promise<string> {
  const response = await fetch(`http://localhost:5298/api/Report/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete report with id ${id}`);
  }

  const message = await response.text();
  return message;
}

export async function addReport(report: Report): Promise<string> {
  const response = await fetch("http://localhost:5298/api/Report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error("Failed to create report");
  }

  const message = await response.text();
  return message;
}

export async function updateReport(id: number, updated: Report) {
  const response = await fetch(`http://localhost:5298/api/Report/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updated),
  });

  if (!response.ok) {
    throw new Error(`Failed to update report with id ${id}`);
  }

  const data = await response.json();
  return data;
}
