/**
 * 默认车票数据
 */
export const defaultTicketData = {
  // 正面信息
  ticketNumber: "B491001",
  departureStation: "和谐",
  departureStationEn: "Hexie",
  arrivalStation: "富强",
  arrivalStationEn: "Fuqiang",
  trainNumber: "G2025",
  date: "2025年10月01日",
  time: "14:00",
  carriage: "10",
  seat: "01F",
  seatType: "商务座",
  price: "1949.0",
  idCard: "450201199001011234",
  passengerName: "张三",
  serialNumber: "E194910011949100149101 JM",
  ticketType: "仅供纪念使用",
  checkGate: "",
  notes1: "欢度国庆 祝福祖国",
  notes2: "中国铁路祝您旅途愉快",

  // 背面信息
  backTitle: "报销凭证使用须知",
  backParagraphs: [
    "购票后如需报销凭证的，应在开车前或乘车日期之日起180日以内(含当日)，持购票是所使用的有效身份证件原件到车站售票窗口、自动售票机领取。",
    "退票后如需退票费报销凭证，应在办理之日起180日以内(含当日)，持购票是所使用的有效身份证件原件到车站退票窗口领取。",
    "报销凭证开具后请妥善保管，丢失后将无法办理补办申领手续。",
    "已领取报销凭证的车票办理改签、退票或退款手续时，须交回报销凭证方可办理。",
    "报销凭证不能作为乘车凭证使用。",
    "未尽事宜见《国铁集团铁路旅客运输规程》等有关规定和车站公告。跨境旅客事宜见铁路跨境旅客相关运输组织规则和车站公告。",
  ],
};

/**
 * 使用说明内容
 */
export const userGuideContent = `
## <center><font color="red" size="5"><b>本功能仅供学习交流使用，切勿用于非法用途！</b></font></center>

## 打印选项
- 打印背面：打印车票背面内容
- 打印正面：打印车票正面内容
- 纸张尺寸：88mm * 54mm

## 注意事项
1. 所有信息将自动保存在本地，下次打开时自动加载
2. 身份证号将自动脱敏处理，保护您的隐私
3. 本系统最佳体验在PC端，请使用电脑访问
4. 个人使用，不支持定制，如需更改，请获取最新源码后自行修改

祝您使用愉快！
`;
