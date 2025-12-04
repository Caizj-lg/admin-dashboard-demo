import { useState } from 'react';
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

interface LongTermTag {
  id: number;
  thscode: string;
  labelName: string;
  labelType: '风格' | '行业' | '风险' | '自定义';
  labelValue: string;
  update_time: string;
}

// Mock data
const mockData: LongTermTag[] = [
  {
    id: 1,
    thscode: '000001.SZ',
    labelName: '波动性等级',
    labelType: '风格',
    labelValue: '中等波动',
    update_time: '2025-11-22 10:30:00',
  },
  {
    id: 2,
    thscode: '000001.SZ',
    labelName: '成长风格',
    labelType: '风格',
    labelValue: '价值型',
    update_time: '2025-11-22 10:30:00',
  },
  {
    id: 3,
    thscode: '600000.SH',
    labelName: '行业分类',
    labelType: '行业',
    labelValue: '金融',
    update_time: '2025-11-22 10:30:00',
  },
  {
    id: 4,
    thscode: '600000.SH',
    labelName: '风险等级',
    labelType: '风险',
    labelValue: '中风险',
    update_time: '2025-11-22 10:30:00',
  },
  {
    id: 5,
    thscode: '000002.SZ',
    labelName: '波动性等级',
    labelType: '风格',
    labelValue: '高波动',
    update_time: '2025-11-22 10:30:00',
  },
  {
    id: 6,
    thscode: '000002.SZ',
    labelName: '成长风格',
    labelType: '风格',
    labelValue: '成长型',
    update_time: '2025-11-22 10:30:00',
  },
  {
    id: 7,
    thscode: '000002.SZ',
    labelName: '行业分类',
    labelType: '行业',
    labelValue: '房地产',
    update_time: '2025-11-22 10:30:00',
  },
];

export function LongTermTagsPage() {
  const [filterType, setFilterType] = useState<string>('all');

  const getTypeBadge = (type: string) => {
    const styles = {
      '风格': 'bg-blue-100 text-blue-700 border-blue-200',
      '行业': 'bg-purple-100 text-purple-700 border-purple-200',
      '风险': 'bg-orange-100 text-orange-700 border-orange-200',
      '自定义': 'bg-slate-100 text-slate-700 border-slate-200',
    };
    return (
      <Badge variant="outline" className={styles[type as keyof typeof styles]}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">长期维度标签表</h1>
          <p className="text-slate-500 mt-1">用于存储某个股票在长期维度上的多种标签，如波动性等级、成长风格、行业分类、风险等级等</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          新增标签
        </Button>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <label className="text-sm text-slate-600">标签类型：</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择标签类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="风格">风格</SelectItem>
                <SelectItem value="行业">行业</SelectItem>
                <SelectItem value="风险">风险</SelectItem>
                <SelectItem value="自定义">自定义</SelectItem>
              </SelectContent>
            </Select>
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
                  <TableHead>标签名称</TableHead>
                  <TableHead>标签类型</TableHead>
                  <TableHead>标签值</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData
                  .filter((row) => filterType === 'all' || row.labelType === filterType)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell className="text-blue-600">{row.thscode}</TableCell>
                      <TableCell className="text-slate-900">{row.labelName}</TableCell>
                      <TableCell>{getTypeBadge(row.labelType)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {row.labelValue}
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

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              显示 1 到 {mockData.filter((row) => filterType === 'all' || row.labelType === filterType).length} 条，共{' '}
              {mockData.filter((row) => filterType === 'all' || row.labelType === filterType).length} 条记录
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
