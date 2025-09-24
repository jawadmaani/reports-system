type ReportFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const ReportForm = ({ onSubmit }: ReportFormProps) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />

        <label>
          Latitude:
          <input type="number" name="lat" />
        </label>
        <br />

        <label>
          Longitude:
          <input type="number" name="lng" />
        </label>
        <br />

        <label>
          Importance:
          <select name="importance">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />

        <label>
          Type:
          <select name="type">
            <option value="signal">Signal</option>
            <option value="roadwork">Roadwork</option>
            <option value="accident">Accident</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />

        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <br />

        <button type="submit">Save Report</button>
      </form>
    </>
  );
};
export default ReportForm;
