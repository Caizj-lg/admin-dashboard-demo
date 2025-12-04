/**
 * API 基础配置
 */

// API 基础路径
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// API 路径
export const API_ENDPOINTS = {
  // 市场数据
  MARKET_DATA: '/market-data',
  MARKET_DATA_BY_ID: (id: number) => `/market-data/${id}`,
  
  // 成交数据
  TRANSACTION_DATA: '/transaction-data',
  TRANSACTION_DATA_BY_ID: (id: number) => `/transaction-data/${id}`,
  
  // 长期标签
  LONG_TERM_TAGS: '/long-term-tags',
  LONG_TERM_TAGS_BY_ID: (id: number) => `/long-term-tags/${id}`,
  
  // 仪表盘
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_CHARTS: '/dashboard/charts',
};

/**
 * 通用请求函数
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

/**
 * GET 请求
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST 请求
 */
export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT 请求
 */
export async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 请求
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}
