/**
 * 身份证号脱敏处理
 * 保留前10位和后4位，中间用*代替
 */
export function maskIdCard(idCard: string): string {
  if (!idCard) return "";
  return idCard.replace(/^(\d{10})(\d+)(\d{4})$/, "$1****$3");
}

/**
 * 生成车票二维码内容
 */
export function generateQrCodeContent(ticketInfo: any): string {
  if (!ticketInfo) return "";

  // 拼接车票信息生成二维码内容
  const content = [
    `车次:${ticketInfo.trainNumber || ""}`,
    `日期:${ticketInfo.date || ""}`,
    `时间:${ticketInfo.time || ""}`,
    `出发站:${ticketInfo.departureStation || ""}`,
    `到达站:${ticketInfo.arrivalStation || ""}`,
    `座位:${ticketInfo.seat || ""}`,
    `票价:${ticketInfo.price || ""}`,
  ].join("|");

  return content;
}
