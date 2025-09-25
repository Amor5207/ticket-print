import React from "react";
import QRCode from "qrcode.react";
import { maskIdCard, generateQrCodeContent } from "@/utils/formatters";

interface TicketFrontProps {
  data: any;
  isPreview?: boolean;
  onlyBackground?: boolean;
  onlyInfo?: boolean;
}

export const TicketFront: React.FC<TicketFrontProps> = ({
  data,
  isPreview = false,
  onlyBackground = false,
  onlyInfo = false,
}) => {
  // 车票尺寸：长88mm，宽54mm，固定比例放大1.5倍
  const scale = 1.5; // 放大比例，保持88:54的宽高比
  const ticketWidth = 88 * scale;
  const ticketHeight = 54 * scale;

  // 生成二维码内容
  const qrContent = generateQrCodeContent(data);

  // 如果只打印背景，不显示文字信息
  if (onlyBackground) {
    return (
      <div
        className="relative overflow-hidden rounded-lg shadow-lg"
        style={{
          width: `${ticketWidth}mm`,
          height: `${ticketHeight}mm`,
          backgroundColor: "#e6f2ff",
        }}
      >
        {/* 背景图片 - 使用淡蓝色背景代替实际图片 */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{
            backgroundImage: 'url("/ticket.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    );
  }

  // 如果只打印信息，不显示背景
  if (onlyInfo) {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: `${ticketWidth}mm`,
          height: `${ticketHeight}mm`,
          backgroundColor: "transparent",
        }}
      >
        {/* 车票信息 */}
        <div className="absolute inset-0 p-4 text-sm font-sans">
          {/* 1. 车票编号和检票口 */}
          <div className="flex justify-between items-center mb-3">
            <div className="text-blue-600 font-bold">{data.ticketNumber}</div>
            {data.checkGate && (
              <div className="text-blue-600 font-bold">
                检票：{data.checkGate}
              </div>
            )}
          </div>

          {/* 2. 车站信息和车次 */}
          <div className="flex items-center justify-between mb-2">
            {/* 起点站 */}
            <div className="min-w-[80px] text-center">
              <div className="text-lg font-bold flex justify-center">
                {data.departureStation.replace("站", "")}
                <span className="text-xs ml-1">站</span>
              </div>
              <div className="text-xs text-gray-500">
                {data.departureStationEn}
              </div>
            </div>

            {/* 车次号和箭头 */}
            <div className="flex flex-col items-center flex-1 mx-2">
              <div className="text-lg font-bold">{data.trainNumber}</div>
              <div className="w-[100px] border-t border-gray-400 mt-1"></div>
            </div>

            {/* 到达站 */}
            <div className="min-w-[80px] text-center">
              <div className="text-lg font-bold flex justify-center">
                {data.arrivalStation.replace("站", "")}
                <span className="text-xs ml-1">站</span>
              </div>
              <div className="text-xs text-gray-500">
                {data.arrivalStationEn}
              </div>
            </div>
          </div>

          {/* 3. 开车时间和座位号 */}
          <div className="flex justify-between mb-2">
            <div>
              <div className="text-sm">
                开车时间：
                <span className="text-xs">
                  {data.date} {data.time}
                </span>
                <span className="text-xs">开</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">
                座位号：
                <span className="text-xs">
                  {data.carriage.replace("车", "")}
                  <span className="text-xs">车</span>
                  {data.seat.replace("号", "")}
                  <span className="text-xs">号</span>
                </span>
              </div>
            </div>
          </div>

          {/* 4. 车票金额和席位 */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-bold text-blue-600">
              {data.price.replace("元", "")}
              <span className="text-xs">元</span>
            </div>
            <div className="text-sm">{data.seatType}</div>
          </div>

          {/* 5. 票的用途 */}
          {data.ticketType && (
            <div className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-sm mb-3">
              {data.ticketType}
            </div>
          )}

          {/* 6. 身份证号、姓名和二维码 */}
          <div className="flex items-center justify-between mb-3">
            {data.idCard && (
              <div className="text-sm text-gray-600">
                {maskIdCard(data.idCard)} 张三
              </div>
            )}
            <div className="relative top-[-15px]">
              <QRCode value={qrContent || "https://12306.cn"} size={50} />
            </div>
          </div>

          {/* 7. 底部信息（虚线边框） */}
          <div className="relative mb-2">
            <div className="border border-dashed border-gray-400 rounded-sm px-2 py-1 text-center">
              <div className="text-xs text-gray-500">
                {data.notes.split(" ")[0]}
              </div>
              <div className="text-xs text-gray-500">
                {data.notes.split(" ")[1] || ""}
              </div>
            </div>
          </div>

          {/* 8. 21位编号和售票方式 */}
          <div className="text-xs text-gray-600">
            E123456789012345678901 网上售票
          </div>
        </div>
      </div>
    );
  }

  // 默认显示完整车票
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg border border-gray-300"
      style={{
        width: `${ticketWidth}mm`,
        height: `${ticketHeight}mm`,
        backgroundColor: "#ffffff",
      }}
    >
      {/* 背景图片 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          backgroundImage: 'url("/ticket.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 车票信息 */}
      <div className="absolute inset-0 py-2 px-5 text-sm font-[SimSun] text-black">
        {/* 1. 车票编号和检票口 */}
        <div className="flex justify-between items-center">
          <div className="font-bold text-[26px] text-red-400">
            {data.ticketNumber}
          </div>

          {data.checkGate ? (
            <div className="text-xl font-bold">检票:{data.checkGate}</div>
          ) : (
            <div className="text-xl font-bold opacity-0">检票</div>
          )}
        </div>

        {/* 2. 车站信息和车次 */}
        <div className="flex items-center justify-between ml-4 mr-6 py-3 pb-1">
          {/* 起点站 */}
          <div className=" text-center">
            <div className="text-[30px] min-w-[100px] font-bold flex items-center">
              <div
                className="w-full font-['黑体']"
                style={{ textAlign: "justify", textAlignLast: "justify" }}
              >
                {data.departureStation?.replace("站", "")}
              </div>
              <span className="text-sm ml-1">站</span>
            </div>
            <div className="text-lg font-bold font-['黑体']">
              {data.departureStationEn}
            </div>
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
              <span className="text-sm ml-1">站</span>
            </div>
            <div className="text-lg font-bold font-['黑体']">
              {data.arrivalStationEn}
            </div>
          </div>
        </div>

        {/* 3. 开车时间和座位号 */}
        <div className="flex justify-between ml-4 mr-6 font-bold">
          <div>
            <div className="text-base">
              {data.date &&
                data.date.split("年").map((part: string, i: number) =>
                  i === 0 ? (
                    <span key={i} className="text-xl">
                      {part}
                    </span>
                  ) : (
                    part.split("月").map((p: string, j: number) =>
                      j === 0 ? (
                        <React.Fragment key={j}>
                          <span className="text-sm mx-1">年</span>
                          <span className="text-xl">{p}</span>
                        </React.Fragment>
                      ) : (
                        p.split("日").map((d: string, k: number) =>
                          k === 0 ? (
                            <React.Fragment key={k}>
                              <span className="text-sm mx-1">月</span>
                              <span className="text-xl">{d}</span>
                              <span className="text-sm mx-1">日</span>
                            </React.Fragment>
                          ) : null
                        )
                      )
                    )
                  )
                )}
              <span className="text-base">
                {" "}
                <span className="text-xl">{data.time}</span>
              </span>
              <span className="text-sm ml-1">开</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-base">
              <span className="text-xl">{data.carriage}</span>
              <span className="text-sm">车</span>
              <span className="text-xl">{data.seat}</span>
              <span className="text-sm">号</span>
            </div>
          </div>
        </div>

        {/* 4. 车票金额和席位 */}
        <div className="flex justify-between items-center ml-4 mr-6 font-bold">
          <div className="text-xl">
            ¥<span className="ml-1">{data.price}</span>
            <span className="text-sm">元</span>
          </div>
          <div className="text-base font-bold">{data.seatType}</div>
        </div>
        {/* 5. 票的用途 */}
        <div className="mt-5 ml-4 mr-6 font-bold">
          <div className="inline-block text-black text-base rounded-sm">
            {data.ticketType}
          </div>
        </div>

        {/* 6. 身份证号、姓名 */}
        <div className="flex items-center justify-between ml-4 mr-6 font-bold">
          <div className="text-base">
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
        <div className="flex justify-center w-[calc(100%-100px)] font-bold">
          <div className="border border-dashed border-black rounded-sm text-center w-[80%]">
            <div className="text-sm">{data.notes1}</div>
            <div className="text-sm">{data.notes2}</div>
          </div>
        </div>
        {/* 8. 21位编号和售票方式 */}
        <div className="text-sm mt-4 font-bold">{data.serialNumber}</div>
      </div>
    </div>
  );
};
