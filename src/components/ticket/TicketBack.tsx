import React from "react";

interface TicketBackProps {
  data: any;
  isPreview?: boolean;
}

export const TicketBack: React.FC<TicketBackProps> = ({ data }) => {
  // 车票尺寸：长88mm，宽54mm，固定比例放大1.5倍
  const getScale = () => {
    return 1.5; // 放大比例，保持88:54的宽高比
  };
  const scale = getScale();
  const ticketWidth = 88 * scale;
  const ticketHeight = 54 * scale;

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        width: `${ticketWidth}mm`,
        height: `${ticketHeight}mm`,
        backgroundColor: "#000000",
      }}
    >
      <div
        className="absolute inset-0 p-4 text-white font-['黑体']"
        style={{ opacity: 1 }}
      >
        <div className="">
          <span className="font-bold text-xl" style={{ letterSpacing: "-2px" }}>
            {data.backTitle}
          </span>
          {data.backParagraphs.map((para: string, index: number) => (
            <span key={index} className="text-[11.6px] font-bold">
              <span className="">☆</span>
              {para}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
