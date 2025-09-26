import { Report } from "@/types/types";
import { useState } from "react";
import ReportMap from "./report-map";

type ReportFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  initialData?: Report;
};

const ReportForm = ({ onSubmit, initialData }: ReportFormProps) => {
  const [selectedLat, setSelectedLat] = useState(
    initialData?.location.lat || 32
  );
  const [selectedLng, setSelectedLng] = useState(
    initialData?.location.lng || 35
  );

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLat(lat);
    setSelectedLng(lng);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          defaultValue={initialData?.title || ""}
        />
      </label>
      <br />

      <label>Location:</label>
      <ReportMap
        latitude={selectedLat}
        longitude={selectedLng}
        onLocationSelect={handleLocationSelect}
        interactive={true}
      />
      <input type="hidden" name="lat" value={selectedLat} />
      <input type="hidden" name="lng" value={selectedLng} />
      <br />

      <label>
        Importance:
        <select name="importance" defaultValue={initialData?.importance}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <br />

      <label>
        Type:
        <select name="type" defaultValue={initialData?.type}>
          <option value="traffic_light">Signal</option>
          <option value="roadwork">Roadwork</option>
          <option value="accident">Accident</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />

      <label>
        Description:
        <textarea
          name="description"
          defaultValue={initialData?.description}
        ></textarea>
      </label>
      <br />

      <button type="submit">Save Report</button>
    </form>
  );
};

export default ReportForm;
