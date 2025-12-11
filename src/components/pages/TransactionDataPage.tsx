import React, { useState, useEffect, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { DataTablePagination } from '../common/DataTablePagination';
import { usePagination } from '../../hooks/usePagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MOCK_TRANSACTION_DATA } from '../../mocks/transaction-data.mock';

const ITEMS_PER_PAGE = 10;

export function TransactionDataPage() {
  const [searchCode, setSearchCode] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // 动态获取所有不重复的交易状态
  const uniqueStatuses = useMemo(() => {
    return ['all', ...new Set(MOCK_TRANSACTION_DATA.map((item) => item.status))];
  }, []);

  // 筛选和查询逻辑
  const filteredData = useMemo(() => {
    return MOCK_TRANSACTION_DATA.filter((row) => {
      // 股票代码查询
      const matchesSearch = searchCode === '' || row.thscode.toLowerCase().includes(searchCode.toLowerCase());
      // 交易状态筛选
      const matchesStatus = filterStatus === 'all' || row.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchCode, filterStatus]);

  // 重置筛选条件
  const handleReset = () => {
    setSearchCode('');
    setFilterStatus('all');
  };

  // 分页 Hook（基于筛选后的数据）
  const { currentPage, pageSize, totalPages, currentData: paginatedData, goToPage } = usePagination(
    filteredData,
    ITEMS_PER_PAGE
  );

  // 当筛选条件改变时，重置到第一页
  useEffect(() => {
    goToPage(1);
  }, [searchCode, filterStatus, goToPage]);

  // 交易状态徽章
  const getTradeStatusBadge = (status: string) => {
    const styles = {
      '强制平仓': 'bg-red-100 text-red-700 border-red-200',
      '止盈': 'bg-green-100 text-green-700 border-green-200',
      '止损': 'bg-orange-100 text-orange-700 border-orange-200',
    };
    const defaultStyle = 'bg-slate-100 text-slate-700 border-slate-200';
    return (
      <Badge variant="outline" className={styles[status as keyof typeof styles] || defaultStyle}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div>
        <h1 className="text-slate-900">成交数据</h1>
        <p className="text-slate-500 mt-1">查看并管理股票的成交详情</p>
      </div>

      {/* 查询和筛选模块 */}
      <Card>
        <CardHeader>
          <CardTitle>查询和筛选</CardTitle>
          <CardDescription>根据股票代码查询，按交易状态筛选</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-2">股票代码</label>
              <Input
                placeholder="请输入股票代码"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-2">模拟交易状态</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择交易状态" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? '全部状态' : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => goToPage(1)}
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

      {/* 数据表格 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>ID</TableHead>
                  <TableHead>股票代码</TableHead>
                  <TableHead>交易日期</TableHead>
                  <TableHead>昨收价</TableHead>
                  <TableHead>最高价</TableHead>
                  <TableHead>最低价</TableHead>
                  <TableHead>开盘价</TableHead>
                  <TableHead>收盘价</TableHead>
                  <TableHead>自定义振幅</TableHead>
                  <TableHead>模拟交易状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>更新时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell className="text-blue-600">{row.thscode}</TableCell>
                      <TableCell>{row.tradeDate}</TableCell>
                      <TableCell>{row.preClose.toFixed(2)}</TableCell>
                      <TableCell className="text-green-600">{row.high.toFixed(2)}</TableCell>
                      <TableCell className="text-red-600">{row.low.toFixed(2)}</TableCell>
                      <TableCell>{row.open.toFixed(2)}</TableCell>
                      <TableCell className="font-medium">{row.close.toFixed(2)}</TableCell>
                      <TableCell>{row.high_preClose_pct}</TableCell>
                      <TableCell>{getTradeStatusBadge(row.status)}</TableCell>
                      <TableCell className="text-slate-500 text-xs">{row.create_time}</TableCell>
                      <TableCell className="text-slate-500 text-xs">{row.update_time}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center text-slate-500 py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* 分页 */}
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredData.length}
            onPageChange={goToPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
