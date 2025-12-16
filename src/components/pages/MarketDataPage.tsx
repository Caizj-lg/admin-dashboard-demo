import { useState, useMemo } from 'react';
import { Upload, Download, Search, RotateCcw, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { PageHeader } from '../common/PageHeader';
import { DataTablePagination } from '../common/DataTablePagination';
import { MOCK_MARKET_DATA } from '../../mocks/market-data.mock';
import { usePagination } from '../../hooks/usePagination';
import { formatPrice, formatAmount, formatNumber, formatChangePercentage, formatChange, getChangeColor } from '../../lib/formatters';

export function MarketDataPage() {
  // 输入中的值
  const [filterCodeInput, setFilterCodeInput] = useState('');
  const [filterDateInput, setFilterDateInput] = useState('');
  // 生效后的查询条件
  const [filterCode, setFilterCode] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // 筛选数据逻辑
  const filteredData = useMemo(() => {
    return MOCK_MARKET_DATA.filter((row) => {
      // 股票代码筛选
      const matchesCode = filterCode === '' || row.thscode.toLowerCase().includes(filterCode.toLowerCase());
      // 交易日期筛选
      const matchesDate = filterDate === '' || row.tradeDate === filterDate;
      return matchesCode && matchesDate;
    });
  }, [filterCode, filterDate]);

  // 使用分页 Hook（基于筛选后的数据）
  const {
    currentPage,
    currentData,
    goToPage,
  } = usePagination(filteredData);

  const totalPages = Math.ceil(filteredData.length / 10);

  const handleReset = () => {
    setFilterCodeInput('');
    setFilterDateInput('');
    setFilterCode('');
    setFilterDate('');
    goToPage(1);
  };

  const handleQuery = () => {
    setFilterCode(filterCodeInput);
    setFilterDate(filterDateInput);
    goToPage(1);
  };

  const handleExport = () => {
    exportMarketDataToCSV(filteredData);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="市场行情基础数据"
        description="查看和管理市场行情基础数据表"
        actions={
          <>
            <Button
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              导出 CSV 数据
            </Button>
          </>
        }
      />

      {/* Filter Card */}
      <Card>
        <CardHeader>
          <CardTitle>筛选条件</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-2">股票代码</label>
              <Input
                placeholder="请输入股票代码，如：000001.SZ"
                value={filterCodeInput}
                onChange={(e) => setFilterCodeInput(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-2">交易日期</label>
              <Input
                type="date"
                value={filterDateInput}
                onChange={(e) => setFilterDateInput(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleQuery}
              >
                <Search className="w-4 h-4" />
                查询
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                重置
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table Card */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>ID</TableHead>
                  <TableHead>股票代码</TableHead>
                  <TableHead>交易日期</TableHead>
                  <TableHead>开盘价</TableHead>
                  <TableHead>收盘价</TableHead>
                  <TableHead>最高价</TableHead>
                  <TableHead>最低价</TableHead>
                  <TableHead>成交量</TableHead>
                  <TableHead>成交额</TableHead>
                  <TableHead>涨跌额</TableHead>
                  <TableHead>涨跌幅</TableHead>
                  <TableHead>换手率</TableHead>
                  <TableHead>昨收价</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell className="text-blue-600">{row.thscode}</TableCell>
                      <TableCell>{row.tradeDate}</TableCell>
                      <TableCell>{formatPrice(row.open)}</TableCell>
                      <TableCell>{formatPrice(row.close)}</TableCell>
                      <TableCell className="text-red-600">{formatPrice(row.high)}</TableCell>
                      <TableCell className="text-green-600">{formatPrice(row.low)}</TableCell>
                      <TableCell>{formatNumber(row.volume)}</TableCell>
                      <TableCell>{formatAmount(row.amount)}</TableCell>
                      <TableCell className={getChangeColor(row.change_amount)}>
                        {formatChange(row.change_amount)}
                      </TableCell>
                      <TableCell className={getChangeColor(row.changeRatio)}>
                        {formatChangePercentage(row.changeRatio)}
                      </TableCell>
                      <TableCell>{formatPrice(row.turnoverRatio)}%</TableCell>
                      <TableCell>{formatPrice(row.preClose)}</TableCell>
                      <TableCell className="text-slate-500">{row.create_time}</TableCell>
                      <TableCell className="text-slate-500">{row.update_time}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Pencil className="w-4 h-4 text-slate-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={16} className="text-center text-slate-500 py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={10}
            totalItems={filteredData.length}
            onPageChange={goToPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// 临时放置的 CSV 导出工具，后续可抽离到 lib/export.ts
function exportMarketDataToCSV(data: any[]) {
  if (!data || data.length === 0) return;

  // CSV 表头
  const headers = [
    'ID',
    '股票代码',
    '交易日期',
    '开盘价',
    '收盘价',
    '最高价',
    '最低价',
    '成交量',
    '成交额',
    '涨跌额',
    '涨跌幅',
    '换手率',
    '昨收价',
    '创建时间',
    '更新时间',
  ];

  const rows = data.map((row) => [
    row.id,
    row.thscode,
    row.tradeDate,
    row.open,
    row.close,
    row.high,
    row.low,
    row.volume,
    row.amount,
    row.change_amount,
    row.changeRatio,
    row.turnoverRatio,
    row.preClose,
    row.create_time,
    row.update_time,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell ?? ''}"`).join(','))
    .join('\n');

  // 添加 UTF-8 BOM，避免 Excel 打开时中文乱码
  const csvWithBom = '\uFEFF' + csvContent;

  const blob = new Blob([csvWithBom], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `market-data-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}