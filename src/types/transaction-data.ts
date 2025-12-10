import { BaseFilter } from './index';

// 1. 👇👇👇 这是核心的修改部分 👇👇👇
// 更新 TransactionData 接口，使其与您的新 Excel 数据结构完全匹配。
export interface TransactionData {
  id: number;
  thscode: string;
  tradeDate: string;
  preClose: number;
  high: number;
  low: number;
  open: number;
  close: number;
  high_preClose_pct: string; // 对应 "自定义振幅"
  status: string;           // 对应 "模拟交易状态"
  create_time: string;
  update_time: string;
}
// 👆👆👆 这是核心的修改部分 👆👆👆


// 2. 我们保留了 TransactionDataFilter 接口，以保持文件结构的完整性。
//    它定义了筛选时可以使用的参数。
export interface TransactionDataFilter extends BaseFilter {
  thscode?: string;
  tradeDate?: string;
}
