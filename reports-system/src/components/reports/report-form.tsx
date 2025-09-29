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
    <form onSubmit={onSubmit} className="space-y-8 max-w-md mx-auto p-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={initialData?.title || ""}
        />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <ReportMap
          latitude={selectedLat}
          longitude={selectedLng}
          onLocationSelect={handleLocationSelect}
          interactive={true}
        />
        <Input type="hidden" name="lat" value={selectedLat} />
        <Input type="hidden" name="lng" value={selectedLng} />
      </div>
      <div className="space-y-2">
        <Label>Importance</Label>
        <Select defaultValue={importance} onValueChange={setImportance}>
          <SelectTrigger>
            <SelectValue placeholder="Select importance" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent className="z-50">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input type="hidden" name="importance" value={importance} />
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select defaultValue={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectPortal >
            <SelectContent className="z-50">
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialData?.description}
        />
      </div>

      <Button type="submit" className="w-full">
        Save Report
      </Button>
    </form>
  );
};

export default ReportForm;
