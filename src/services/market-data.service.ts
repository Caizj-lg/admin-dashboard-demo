import type { MarketData, MarketDataFilter } from '../types/market-data';
import type { ApiResponse } from '../types';
import { MOCK_MARKET_DATA } from '../mocks/market-data.mock';

/**
 * 市场数据服务层
 * 
 * 注意：当前使用 Mock 数据模拟 API 调用
 * 在实际项目中，应替换为真实的 API 请求
 */

/**
 * 获取市场数据列表
 */
export async function getMarketDataList(
  filter?: MarketDataFilter,
  page = 1,
  pageSize = 10
): Promise<ApiResponse<MarketData[]>> {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  // 筛选数据
  let filteredData = [...MOCK_MARKET_DATA];
  
  if (filter?.thscode) {
    filteredData = filteredData.filter(item => 
      item.thscode.toLowerCase().includes(filter.thscode!.toLowerCase())
    );
  }
  
  if (filter?.tradeDate) {
    filteredData = filteredData.filter(item => 
      item.tradeDate === filter.tradeDate
    );
  }

  // 分页
  const total = filteredData.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total,
    page,
    pageSize,
    success: true,
  };
}

/**
 * 根据ID获取市场数据
 */
export async function getMarketDataById(id: number): Promise<MarketData | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const data = MOCK_MARKET_DATA.find(item => item.id === id);
  return data || null;
}

/**
 * 创建市场数据
 */
export async function createMarketData(data: Omit<MarketData, 'id' | 'create_time' | 'update_time'>): Promise<MarketData> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟创建
  const newData: MarketData = {
    ...data,
    id: MOCK_MARKET_DATA.length + 1,
    create_time: new Date().toISOString(),
    update_time: new Date().toISOString(),
  };
  
  return newData;
}

/**
 * 更新市场数据
 */
export async function updateMarketData(id: number, data: Partial<MarketData>): Promise<MarketData> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const existingData = MOCK_MARKET_DATA.find(item => item.id === id);
  if (!existingData) {
    throw new Error('数据不存在');
  }
  
  const updatedData: MarketData = {
    ...existingData,
    ...data,
    update_time: new Date().toISOString(),
  };
  
  return updatedData;
}

/**
 * 删除市场数据
 */
export async function deleteMarketData(id: number): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const exists = MOCK_MARKET_DATA.some(item => item.id === id);
  return exists;
}
