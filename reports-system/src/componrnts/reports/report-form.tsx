import { Report } from "@/types/types";

type ReportFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  initialData?: Report;
};

const ReportForm = ({ onSubmit, initialData }: ReportFormProps) => {
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

      <label>
        Latitude:
        <input
          type="number"
          name="lat"
          defaultValue={initialData?.location.lat || 0}
        />
      </label>
      <br />

      <label>
        Longitude:
        <input
          type="number"
          name="lng"
          defaultValue={initialData?.location.lng || 0}
        />
      </label>
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
