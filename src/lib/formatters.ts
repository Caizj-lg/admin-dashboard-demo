/**
 * 数值格式化工具函数
 */

// 格式化价格（保留2位小数）
export function formatPrice(value: number): string {
  return value.toFixed(2);
}

// 格式化百分比（保留2位小数）
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

// 格式化涨跌幅（带正负号）
export function formatChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

// 格式化涨跌幅百分比（带正负号）
export function formatChangePercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// 格式化大数字（千位分隔符）
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

// 格式化金额（千位分隔符 + 保留2位小数）
export function formatAmount(value: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// 格式化市值（转换为亿元）
export function formatMarketCap(value: number): string {
  const billion = value / 100000000;
  return `${billion.toFixed(2)}亿`;
}

// 获取涨跌颜色类名
export function getChangeColor(value: number): string {
  if (value > 0) return 'text-red-600';
  if (value < 0) return 'text-green-600';
  return 'text-slate-600';
}

// 格式化日期时间
export function formatDateTime(dateStr: string): string {
  return dateStr; // 如需要可以用 dayjs 等库进行更复杂的格式化
}

// 格式化日期
export function formatDate(dateStr: string): string {
  return dateStr;
}
