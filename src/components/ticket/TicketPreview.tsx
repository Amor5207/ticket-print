import React from "react";
import { TicketFront } from "./TicketFront";
import { TicketBack } from "./TicketBack";

interface TicketPreviewProps {
  data: any;
}

export const TicketPreview: React.FC<TicketPreviewProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <div className="space-y-8">
        <TicketFront data={data} />
        <TicketBack data={data} />
      </div>
    </div>
  );
};
