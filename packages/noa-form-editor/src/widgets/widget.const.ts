export enum WidgetTypes {
  // 基础字段
  Input = 1001, // 单行输入
  Number = 1002, // 数字
  Date = 1003, // 日期
  SingleSelect = 1004, // 单选
  MultiSelect = 1005, // 多选
  Checkbox = 1006, // 开关

  // 业务场景
  Star = 1201, // 星级
  Phone = 1202, // 号码
  Position = 1203, // 位置
  Progress = 1204, // 进度
  Money = 1205, // 金额

  // 文件
  File = 1301, // 文件

  // 内容
  Text = 2001, // 文本
  Image = 2002, // 图片
  Video = 2003, // 视频
  Notice = 2004, // 提醒
  List = 2005, // 列表
  Chart = 2006, // 图表
}
