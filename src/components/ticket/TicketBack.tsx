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
      <div className="absolute inset-0 p-4 text-white font-['宋体']">
        <div className="">
          <p className="font-bold text-xl text-center my-3 font-['黑体']">
            {data.backTitle}
          </p>
          {data.backParagraphs.map((para: string, index: number) => (
            <div
              key={index}
              className="text-sm font-bold"
              style={{
                textIndent: "2em",
              }}
            >
              <span className="">☆</span>
              {para}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
