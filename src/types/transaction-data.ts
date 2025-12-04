import { BaseFilter } from './index';

// 成交数据类型
export interface TransactionData {
  id: number;
  thscode: string;
  tradeDate: string;
  buyVolume: number;
  sellVolume: number;
  netVolume: number;
  buyAmount: number;
  sellAmount: number;
  netAmount: number;
  avgBuyPrice: number;
  avgSellPrice: number;
  create_time: string;
  update_time: string;
}

// 成交数据筛选参数
export interface TransactionDataFilter extends BaseFilter {
  thscode?: string;
  tradeDate?: string;
}
