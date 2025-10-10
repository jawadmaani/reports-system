import { Report } from "@/types/types";
import { useState } from "react";
import ReportMap from "./report-map";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import "../../app/globals.css";
import { SelectPortal } from "@radix-ui/react-select";

type ReportFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  initialData?: Report;
};

const ReportForm = ({ onSubmit, initialData }: ReportFormProps) => {
  const [selectedLat, setSelectedLat] = useState(
    initialData?.location.lat || 30
  );
  const [selectedLng, setSelectedLng] = useState(
    initialData?.location.lng || 30
  );
  const [importance, setImportance] = useState(initialData?.importance || "");
  const [type, setType] = useState(initialData?.type || "");

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLat(lat);
    setSelectedLng(lng);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10 max-w-md mx-auto p-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={initialData?.title || ""}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter report title"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700" htmlFor="map">
          Location
        </Label>
        <ReportMap
          latitude={selectedLat}
          longitude={selectedLng}
          onLocationSelect={handleLocationSelect}
          interactive={true}
          aria-describedby="location-coordinates"
        />
        <Input type="hidden" name="lat" value={selectedLat} />
        <Input type="hidden" name="lng" value={selectedLng} />
        <p id="location-coordinates" className="text-sm text-gray-500">
          Lat: {selectedLat.toFixed(4)}, Lng: {selectedLng.toFixed(4)}
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Importance</Label>
        <Select defaultValue={importance} onValueChange={setImportance}>
          <SelectTrigger className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
            <SelectValue placeholder="Select importance" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent className="z-50 bg-white border-gray-300 rounded-md shadow-sm">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input type="hidden" name="importance" value={importance} />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Type</Label>
        <Select defaultValue={type} onValueChange={setType}>
          <SelectTrigger className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent className="z-50 bg-white border-gray-300 rounded-md shadow-sm">
              <SelectItem value="trafficLight">Traffic Light</SelectItem>
              <SelectItem value="roadwork">Roadwork</SelectItem>
              <SelectItem value="accident">Accident</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input type="hidden" name="type" value={type} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialData?.description}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Describe the issue..."
          rows={5}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200"
      >
        Save Report
      </Button>
    </form>
  );
};

export default ReportForm;
