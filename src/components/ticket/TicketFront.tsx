import React from "react";
import QRCode from "qrcode.react";
import { maskIdCard, generateQrCodeContent } from "@/utils/formatters";

interface TicketFrontProps {
  data: any;
  isPreview?: boolean;
  onlyBackground?: boolean;
  onlyInfo?: boolean;
}

export const TicketFront: React.FC<TicketFrontProps> = ({ data }) => {
  // 车票尺寸：长88mm，宽54mm，固定比例放大1.5倍
  const scale = 1.5; // 放大比例，保持88:54的宽高比
  const ticketWidth = 88 * scale;
  const ticketHeight = 54 * scale;

  // 生成二维码内容
  const qrContent = generateQrCodeContent(data);

  // 默认显示完整车票
  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        minWidth: `${ticketWidth}mm`,
        minHeight: `${ticketHeight}mm`,
        maxWidth: `${ticketWidth}mm`,
        maxHeight: `${ticketHeight}mm`,
      }}
    >
      {/* 背景图片 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100 max-w-[100%] overflow-hidden"
        style={{
          backgroundImage: 'url("/ticket.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 车票信息 */}
      <div className="absolute inset-0 text-lg font-['黑体'] px-8 pt-4 text-black max-w-[100%] overflow-hidden">
        {/* 1. 车票编号和检票口 */}
        <div className="flex justify-between items-center ml-4 mr-6 max-w-[100%] overflow-hidden">
          <div className="font-bold text-[26px] text-red-600">
            {data.ticketNumber}
          </div>

          {data.checkGate ? (
            <div className="text-xl font-bold">检票:{data.checkGate}</div>
          ) : (
            <div className="text-xl font-bold opacity-0">检票</div>
          )}
        </div>

        {/* 2. 车站信息和车次 */}
        <div className="flex items-center justify-between ml-4 mr-6 max-w-[100%] overflow-hidden">
          {/* 起点站 */}
          <div className=" text-center">
            <div className="text-[30px] min-w-[100px] font-bold flex items-center">
              <div
                className="w-full"
                style={{ textAlign: "justify", textAlignLast: "justify" }}
              >
                {data.departureStation?.replace("站", "")}
              </div>
              <span className="text-lg ml-1">站</span>
            </div>
            <div className="text-lg font-bold">{data.departureStationEn}</div>
          </div>

          {/* 车次号和箭头 */}
          <div className="flex flex-col items-center mx-2 max-w-[100px]">
            <div className="text-[30px] font-bold">{data.trainNumber}</div>
            <div className="w-[90px] flex justify-center mt-1">
              <svg
                width="90"
                height="5"
                viewBox="0 0 90 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4H85"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M85 4L90 4M80 0L90 4"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 到达站 */}
          <div className=" text-center">
            <div className="text-[30px] min-w-[100px] font-bold flex items-center">
              <div
                className="w-full font-['黑体']"
                style={{ textAlign: "justify", textAlignLast: "justify" }}
              >
                {data.arrivalStation?.replace("站", "")}
              </div>
              <span className="text-lg ml-1">站</span>
            </div>
            <div className="text-lg font-bold font-['黑体']">
              {data.arrivalStationEn}
            </div>
          </div>
        </div>

        {/* 3. 开车时间和座位号 */}
        <div className="flex justify-between ml-4 mr-6 font-bold max-w-[100%] overflow-hidden">
          <div>
            <div className="text-base">
              {data.date &&
                data.date.split("年").map((part: string, i: number) =>
                  i === 0 ? (
                    <span key={i} className="text-[20px]">
                      {part}
                    </span>
                  ) : (
                    part.split("月").map((p: string, j: number) =>
                      j === 0 ? (
                        <React.Fragment key={j}>
                          <span className="text-lg mx-1">年</span>
                          <span className="text-[20px]">{p}</span>
                        </React.Fragment>
                      ) : (
                        p.split("日").map((d: string, k: number) =>
                          k === 0 ? (
                            <React.Fragment key={k}>
                              <span className="text-lg mx-1">月</span>
                              <span className="text-[20px]">{d}</span>
                              <span className="text-lg mx-1">日</span>
                            </React.Fragment>
                          ) : null
                        )
                      )
                    )
                  )
                )}
              <span className="text-base">
                {" "}
                <span className="text-[20px]">{data.time}</span>
              </span>
              <span className="text-lg ml-1">开</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-base">
              <span className="text-[20px]">{data.carriage}</span>
              <span className="text-lg">车</span>
              <span className="text-[20px]">{data.seat}</span>
              <span className="text-lg">号</span>
            </div>
          </div>
        </div>

        {/* 4. 车票金额和席位 */}
        <div className="flex justify-between items-center ml-4 mr-6 max-w-[100%] overflow-hidden">
          <div className="text-xl">
            ¥<span className="ml-1 font-bold text-[20px]">{data.price}</span>
            <span className="text-lg font-bold">元</span>
          </div>
          <div className="text-base font-bold">{data.seatType}</div>
        </div>
        {/* 5. 票的用途 */}
        <div className="mt-2 ml-4 mr-6 font-bold max-w-[100%] overflow-hidden">
          <div className="inline-block text-black text-base text-lg rounded-sm">
            {data.ticketType}
          </div>
        </div>

        {/* 6. 身份证号、姓名 */}
        <div className="flex items-center justify-between ml-4 mr-6 font-bold max-w-[100%] overflow-hidden">
          <div className="text-base text-lg">
            {maskIdCard(data.idCard)} {data.passengerName}
          </div>
        </div>

        {/* 7. 二维码 - 固定在右下角 */}
        <div className="absolute bottom-10 right-10">
          <div>
            <QRCode
              value={qrContent || "https://12306.cn"}
              size={80}
              bgColor="transparent"
            />
          </div>
        </div>
        {/* 7. 底部信息（虚线边框） */}
        <div className="relative w-[calc(100%-160px)] text-center ml-4">
          {/* 使用 SVG 绘制虚线边框 */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* 横向虚线 (顶部和底部) */}
            <path
              d="M1 1 H99" // 水平线从左到右 (顶部)
              fill="none"
              stroke="black"
              strokeDasharray="4, 2" // 控制虚线的长度和间隔
              strokeWidth="1"
            />
            <path
              d="M1 99 H99" // 水平线从左到右 (底部)
              fill="none"
              stroke="black"
              strokeDasharray="4, 2" // 控制虚线的长度和间隔
              strokeWidth="1"
            />

            {/* 竖向虚线 (左侧和右侧) */}
            <path
              d="M1 1 V99" // 垂直线从上到下 (左侧)
              fill="none"
              stroke="black"
              strokeDasharray="20, 15" // 增加竖线虚线的间隔，减少密度
              strokeWidth="0.1"
            />
            <path
              d="M99 1 V99" // 垂直线从上到下 (右侧)
              fill="none"
              stroke="black"
              strokeDasharray="20, 15" // 增加竖线虚线的间隔，减少密度
              strokeWidth="0.1"
            />
          </svg>

          {/* 这是你的内容 */}
          <div className="relative z-10">
            <div className="text-sm">{data.notes1}</div>
            <div className="text-sm">{data.notes2}</div>
          </div>
        </div>
        {/* 8. 21位编号和售票方式 */}
        <div className="text-lg my-2 ml-4 mr-6 font-bold max-w-[100%] overflow-hidden">
          {data.serialNumber}
        </div>
      </div>
    </div>
  );
};
