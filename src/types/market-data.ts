import { BaseFilter } from './index';

// 市场行情数据类型
export interface MarketData {
  id: number;
  thscode: string;          // 股票代码
  tradeDate: string;        // 交易日期
  open: number;             // 开盘价
  close: number;            // 收盘价
  high: number;             // 最高价
  low: number;              // 最低价
  volume: number;           // 成交量
  amount: number;           // 成交额
  change_amount: number;    // 涨跌额
  changeRatio: number;      // 涨跌幅
  turnoverRatio: number;    // 换手率
  preClose: number;         // 昨收价
  create_time: string;      // 创建时间
  update_time: string;      // 更新时间
}

// 市场数据筛选参数
export interface MarketDataFilter extends BaseFilter {
  thscode?: string;
  tradeDate?: string;
}
