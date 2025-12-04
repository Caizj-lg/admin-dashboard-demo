// 页面路由类型
export type PageType = 'dashboard' | 'market-data' | 'transaction-data' | 'long-term-tags' | 'settings';

// 分页参数
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// 通用响应类型
export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  pageSize: number;
  success: boolean;
  message?: string;
}

// 通用筛选器类型
export interface BaseFilter {
  keyword?: string;
  startDate?: string;
  endDate?: string;
}
