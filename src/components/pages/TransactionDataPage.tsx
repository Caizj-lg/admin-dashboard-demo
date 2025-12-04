import { useState } from 'react';
import { Search, RotateCcw, Eye, Trash2, RefreshCw } from 'lucide-react';
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

interface TransactionData {
  id: number;
  thscode: string;
  tradeDate: string;
  volume: number;
  amount: number;
  averagePrice: number;
  turnover: number;
  buySellRatio: number;
  volatility: 'high' | 'medium' | 'low';
  create_time: string;
  update_time: string;
}

// Mock data
const mockData: TransactionData[] = [
  {
    id: 1,
    thscode: '000001.SZ',
    tradeDate: '2025-11-22',
    volume: 125847500,
    amount: 1723456789.50,
    averagePrice: 13.69,
    turnover: 1723456789.50,
    buySellRatio: 1.23,
    volatility: 'medium',
    create_time: '2025-11-22 15:35:00',
    update_time: '2025-11-22 15:35:00',
  },
  {
    id: 2,
    thscode: '600000.SH',
    tradeDate: '2025-11-22',
    volume: 89234100,
    amount: 789234567.80,
    averagePrice: 8.85,
    turnover: 789234567.80,
    buySellRatio: 0.87,
    volatility: 'high',
    create_time: '2025-11-22 15:35:00',
    update_time: '2025-11-22 15:35:00',
  },
  {
    id: 3,
    thscode: '000002.SZ',
    tradeDate: '2025-11-22',
    volume: 56789200,
    amount: 1423456789.20,
    averagePrice: 25.06,
    turnover: 1423456789.20,
    buySellRatio: 1.45,
    volatility: 'low',
    create_time: '2025-11-22 15:35:00',
    update_time: '2025-11-22 15:35:00',
  },
];

export function TransactionDataPage() {
  const [filterCode, setFilterCode] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleReset = () => {
    setFilterCode('');
    setFilterDate('');
  };

  const getVolatilityBadge = (volatility: string) => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-green-100 text-green-700 border-green-200',
    };
    const labels = {
      high: '高波动',
      medium: '中波动',
      low: '低波动',
    };
    return (
      <Badge variant="outline" className={styles[volatility as keyof typeof styles]}>
        {labels[volatility as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">成交数据（计算结果）</h1>
          <p className="text-slate-500 mt-1">成交表由基础行情数据计算生成，包含成交额、成交笔数、均价等指标</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="w-4 h-4" />
          重新计算
        </Button>
      </div>

      {/* Filter Card */}
      <Card>
        <CardHeader>
          <CardTitle>筛选条件</CardTitle>
          <CardDescription>根据股票代码和交易日期筛选成交数据</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-2">股票代码</label>
              <Input
                placeholder="请输入股票代码"
                value={filterCode}
                onChange={(e) => setFilterCode(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-2">交易日期</label>
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
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
                  <TableHead>成交量</TableHead>
                  <TableHead>成交额</TableHead>
                  <TableHead>均价（自动计算）</TableHead>
                  <TableHead>成交额（turnover）</TableHead>
                  <TableHead>买卖比</TableHead>
                  <TableHead>波动指标</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell className="text-blue-600">{row.thscode}</TableCell>
                    <TableCell>{row.tradeDate}</TableCell>
                    <TableCell>{row.volume.toLocaleString()}</TableCell>
                    <TableCell>{row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-slate-900">{row.averagePrice.toFixed(2)}</TableCell>
                    <TableCell>{row.turnover.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell>{row.buySellRatio.toFixed(2)}</TableCell>
                    <TableCell>{getVolatilityBadge(row.volatility)}</TableCell>
                    <TableCell className="text-slate-500">{row.create_time}</TableCell>
                    <TableCell className="text-slate-500">{row.update_time}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4 text-blue-600" />
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

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              显示 1 到 {mockData.length} 条，共 {mockData.length} 条记录
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                1
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
