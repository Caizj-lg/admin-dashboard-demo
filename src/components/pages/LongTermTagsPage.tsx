import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { DataTablePagination } from '../common/DataTablePagination';
import { usePagination } from '../../hooks/usePagination';

// 1. 导入你刚刚生成的 JSON 数据
// 确保 stocks.json 文件在 src 目录下
import mockData from './stocks.json';

// 2. 新的数据接口定义，以匹配你的 Excel 列
interface StockInfo {
  '股票代码': string;
  '股票名称': string;
  '市值级别': '大市值' | '中市值' | '小市值';
  '总市值': number;
  '所属板块': string;
  'update_time': string;
}

// 3. 动态地从数据中获取所有不重复的板块，用于筛选
// 我们在前面加上 'all' 用于显示全部
const uniqueSectors = ['all', ...new Set(mockData.map((item) => item.所属板块))];

export function LongTermTagsPage() {
  // 4. 新的状态，用于按板块筛选
  const [filterSector, setFilterSector] = useState<string>('all');

  const getMarketCapBadge = (level: string) => {
    const styles = {
      '大市值': 'bg-blue-100 text-blue-700 border-blue-200',
      '中市值': 'bg-green-100 text-green-700 border-green-200',
      '小市值': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return (
      <Badge variant="outline" className={styles[level as keyof typeof styles]}>
        {level}
      </Badge>
    );
  };

  const filteredData = useMemo(
    () => mockData.filter((row) => filterSector === 'all' || row.所属板块 === filterSector),
    [filterSector]
  );

  // 分页（基于筛选后的数据）
  const { currentPage, pageSize, totalPages, currentData, goToPage } = usePagination(filteredData);

  // 筛选变更时回到第一页
  useEffect(() => {
    goToPage(1);
  }, [filterSector, goToPage]);

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">股票市值板块信息表</h1>
          <p className="text-slate-500 mt-1">展示不同股票的市值、板块等信息</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          新增股票
        </Button>
      </div>

      {/* 筛选栏 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <label className="text-sm text-slate-600">所属板块：</label>
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择所属板块" />
              </SelectTrigger>
              <SelectContent>
                {/* 5. 动态渲染筛选选项 */}
                {uniqueSectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector === 'all' ? '全部板块' : sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 数据表格 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {/* 6. 更新表格的表头 */}
                <TableRow className="bg-slate-50">
                  <TableHead>股票代码</TableHead>
                  <TableHead>股票名称</TableHead>
                  <TableHead>市值级别</TableHead>
                  <TableHead>总市值</TableHead>
                  <TableHead>所属板块</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* 7. 渲染新的数据 */}
                {currentData.map((row) => (
                  <TableRow key={row.股票代码}>
                    <TableCell className="text-blue-600">{row.股票代码}</TableCell>
                    <TableCell className="text-slate-900 font-medium">{row.股票名称}</TableCell>
                    <TableCell>{getMarketCapBadge(row.市值级别)}</TableCell>
                    <TableCell>{(row.总市值 / 100000000).toFixed(2)} 亿</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {row.所属板块}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500">{row.update_time}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="w-4 h-4 text-slate-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
