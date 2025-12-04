// 表格配置常量
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// 市场数据表格列配置
export const MARKET_DATA_COLUMNS = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'thscode', label: '股票代码', width: 120 },
  { key: 'tradeDate', label: '交易日期', width: 120 },
  { key: 'open', label: '开盘价', width: 100 },
  { key: 'close', label: '收盘价', width: 100 },
  { key: 'high', label: '最高价', width: 100 },
  { key: 'low', label: '最低价', width: 100 },
  { key: 'volume', label: '成交量', width: 120 },
  { key: 'amount', label: '成交额', width: 150 },
  { key: 'change_amount', label: '涨跌额', width: 100 },
  { key: 'changeRatio', label: '涨跌幅', width: 100 },
  { key: 'turnoverRatio', label: '换手率', width: 100 },
  { key: 'preClose', label: '昨收价', width: 100 },
  { key: 'create_time', label: '创建时间', width: 180 },
  { key: 'update_time', label: '更新时间', width: 180 },
  { key: 'actions', label: '操作', width: 150 },
];

// 成交数据表格列配置
export const TRANSACTION_DATA_COLUMNS = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'thscode', label: '股票代码', width: 120 },
  { key: 'tradeDate', label: '交易日期', width: 120 },
  { key: 'buyVolume', label: '买入量', width: 120 },
  { key: 'sellVolume', label: '卖出量', width: 120 },
  { key: 'netVolume', label: '净买入量', width: 120 },
  { key: 'buyAmount', label: '买入额', width: 150 },
  { key: 'sellAmount', label: '卖出额', width: 150 },
  { key: 'netAmount', label: '净买入额', width: 150 },
  { key: 'avgBuyPrice', label: '平均买价', width: 100 },
  { key: 'avgSellPrice', label: '平均卖价', width: 100 },
  { key: 'create_time', label: '创建时间', width: 180 },
  { key: 'update_time', label: '更新时间', width: 180 },
  { key: 'actions', label: '操作', width: 150 },
];

// 长期标签表格列配置
export const LONG_TERM_TAGS_COLUMNS = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'thscode', label: '股票代码', width: 120 },
  { key: 'stockName', label: '股票名称', width: 120 },
  { key: 'industry', label: '行业', width: 120 },
  { key: 'sector', label: '板块', width: 120 },
  { key: 'marketCap', label: '市值', width: 150 },
  { key: 'peRatio', label: '市盈率', width: 100 },
  { key: 'pbRatio', label: '市净率', width: 100 },
  { key: 'roe', label: 'ROE', width: 100 },
  { key: 'debtRatio', label: '资产负债率', width: 120 },
  { key: 'dividendYield', label: '股息率', width: 100 },
  { key: 'isStarStock', label: '明星股', width: 100 },
  { key: 'riskLevel', label: '风险等级', width: 100 },
  { key: 'create_time', label: '创建时间', width: 180 },
  { key: 'update_time', label: '更新时间', width: 180 },
  { key: 'actions', label: '操作', width: 150 },
];
