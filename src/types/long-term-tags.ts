import { BaseFilter } from './index';

// 长期标签类型
export interface LongTermTag {
  id: number;
  thscode: string;
  stockName: string;
  industry: string;
  sector: string;
  marketCap: number;
  peRatio: number;
  pbRatio: number;
  roe: number;
  debtRatio: number;
  dividendYield: number;
  isStarStock: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  create_time: string;
  update_time: string;
}

// 长期标签筛选参数
export interface LongTermTagFilter extends BaseFilter {
  thscode?: string;
  industry?: string;
  sector?: string;
  riskLevel?: string;
  isStarStock?: boolean;
}
