# 快速参考指南

## 🎯 常用代码模板

### 1. 创建新页面组件

```typescript
// /components/pages/NewPage.tsx
import { useState } from 'react';
import { PageHeader } from '../common/PageHeader';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export function NewPage() {
  const [state, setState] = useState();

  return (
    <div className="space-y-6">
      <PageHeader
        title="页面标题"
        description="页面描述"
        actions={
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            操作按钮
          </Button>
        }
      />

      <Card>
        <CardContent>
          {/* 页面内容 */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### 2. 创建数据类型

```typescript
// /types/new-data.ts
import { BaseFilter } from './index';

export interface NewData {
  id: number;
  name: string;
  value: number;
  create_time: string;
  update_time: string;
}

export interface NewDataFilter extends BaseFilter {
  name?: string;
  minValue?: number;
  maxValue?: number;
}
```

### 3. 创建Mock数据

```typescript
// /mocks/new-data.mock.ts
import type { NewData } from '../types/new-data';

export const MOCK_NEW_DATA: NewData[] = [
  {
    id: 1,
    name: '示例数据',
    value: 100,
    create_time: '2025-12-03 10:00:00',
    update_time: '2025-12-03 10:00:00',
  },
  // ... 更多数据
];
```

### 4. 创建API服务

```typescript
// /services/new-data.service.ts
import type { NewData, NewDataFilter } from '../types/new-data';
import type { ApiResponse } from '../types';
import { MOCK_NEW_DATA } from '../mocks/new-data.mock';

export async function getNewDataList(
  filter?: NewDataFilter,
  page = 1,
  pageSize = 10
): Promise<ApiResponse<NewData[]>> {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  // 筛选逻辑
  let filteredData = [...MOCK_NEW_DATA];
  
  if (filter?.name) {
    filteredData = filteredData.filter(item => 
      item.name.includes(filter.name!)
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
```

### 5. 创建自定义Hook

```typescript
// /hooks/useNewData.ts
import { useState, useEffect } from 'react';
import type { NewData } from '../types/new-data';
import { getNewDataList } from '../services/new-data.service';

export function useNewData() {
  const [data, setData] = useState<NewData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getNewDataList();
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
```

### 6. 创建格式化工具

```typescript
// /lib/formatters.ts 添加新函数
export function formatCustomValue(value: number): string {
  // 自定义格式化逻辑
  return `${value.toFixed(2)} 单位`;
}
```

### 7. 添加导航项

```typescript
// /constants/navigation.ts
import { NewIcon } from 'lucide-react';

export const NAVIGATION_ITEMS = [
  // ... 现有导航
  { 
    id: 'new-page', 
    label: '新页面', 
    icon: NewIcon 
  },
];
```

### 8. 注册路由

```typescript
// /App.tsx
import { NewPage } from './components/pages/NewPage';

export default function App() {
  const renderPage = () => {
    switch (currentPage) {
      // ... 现有路由
      case 'new-page':
        return <NewPage />;
      // ...
    }
  };
}
```

## 📊 常用组件示例

### 带筛选的数据表格

```typescript
export function DataTablePage() {
  const [filter, setFilter] = useState({ keyword: '' });
  const { currentData, currentPage, goToPage } = usePagination(MOCK_DATA);

  return (
    <div className="space-y-6">
      <PageHeader title="数据列表" />

      {/* 筛选卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>筛选条件</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="搜索关键词"
              value={filter.keyword}
              onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
            />
            <Button>查询</Button>
          </div>
        </CardContent>
      </Card>

      {/* 数据表格 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>列1</TableHead>
                <TableHead>列2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <DataTablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(MOCK_DATA.length / 10)}
            pageSize={10}
            totalItems={MOCK_DATA.length}
            onPageChange={goToPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

### 表单页面

```typescript
export function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    value: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 提交逻辑
  };

  return (
    <div className="space-y-6">
      <PageHeader title="表单页面" />

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">名称</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">数值</label>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: +e.target.value })}
              />
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              提交
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 🎨 常用样式类

### 布局

```typescript
// 容器间距
<div className="space-y-6">  // 垂直间距
<div className="space-x-4">  // 水平间距
<div className="flex gap-4">  // Flex布局带间距

// 内边距
className="p-6"     // 四边
className="px-6 py-4"  // 左右和上下

// 外边距
className="mt-4"    // 顶部
className="mb-6"    // 底部
```

### 文本

```typescript
// 标题
className="text-slate-900"  // 主标题颜色

// 描述文本
className="text-slate-500"  // 副标题/描述

// 辅助文本
className="text-slate-600"  // 标签文本
className="text-xs"         // 小号文本
```

### 颜色

```typescript
// 主题色（蓝色）
className="bg-blue-600 hover:bg-blue-700"  // 主按钮
className="text-blue-600"                  // 链接文本

// 成功/涨（红色）
className="text-red-600"

// 失败/跌（绿色）
className="text-green-600"

// 中性色
className="bg-slate-50"      // 浅背景
className="bg-slate-900"     // 深背景
className="border-slate-200" // 边框
```

### 交互

```typescript
// 悬停效果
className="hover:bg-slate-100"  // 背景变化
className="transition-colors"   // 平滑过渡

// 圆角
className="rounded"      // 小圆角
className="rounded-lg"   // 大圆角
className="rounded-full" // 圆形
```

## 🔧 常用工具函数

### 格式化

```typescript
import { 
  formatPrice,           // 价格（保留2位小数）
  formatAmount,          // 金额（千位分隔+2位小数）
  formatNumber,          // 数字（千位分隔）
  formatPercentage,      // 百分比
  formatChange,          // 涨跌额（带正负号）
  formatChangePercentage,// 涨跌幅（带正负号）
  getChangeColor,        // 获取涨跌颜色类名
} from '../lib/formatters';

// 使用示例
{formatPrice(13.456)}              // "13.46"
{formatAmount(1234567.89)}         // "1,234,567.89"
{formatNumber(125847500)}          // "125,847,500"
{formatPercentage(2.34)}           // "2.34%"
{formatChange(0.23)}               // "+0.23"
{formatChangePercentage(1.71)}     // "+1.71%"
<span className={getChangeColor(row.changeRatio)}>
  {formatChangePercentage(row.changeRatio)}
</span>
```

## 📦 常用导入

```typescript
// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// 图标
import { 
  Search, Upload, Download, Eye, Pencil, Trash2,
  ChevronDown, Bell, LayoutDashboard, TrendingUp,
  Calculator, Tag, Settings, RotateCcw
} from 'lucide-react';

// UI组件
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// 通用组件
import { PageHeader } from '../common/PageHeader';
import { DataTablePagination } from '../common/DataTablePagination';

// 类型
import type { MarketData } from '../../types/market-data';
import type { PageType } from '../../types';

// Hooks
import { usePagination } from '../../hooks/usePagination';

// 工具
import { formatPrice, formatAmount } from '../../lib/formatters';

// Mock数据
import { MOCK_MARKET_DATA } from '../../mocks/market-data.mock';
```

## 🚦 快速检查清单

开发新功能前：
- [ ] 是否需要新的类型定义？→ `/types/`
- [ ] 是否需要Mock数据？→ `/mocks/`
- [ ] 是否需要API服务？→ `/services/`
- [ ] 是否需要自定义Hook？→ `/hooks/`
- [ ] 是否需要工具函数？→ `/lib/`
- [ ] 是否需要新的常量配置？→ `/constants/`

开发组件时：
- [ ] Props 是否有明确的类型定义？
- [ ] 是否使用了合适的UI组件？
- [ ] 是否复用了通用组件？
- [ ] 样式是否使用 Tailwind CSS？
- [ ] 列表渲染是否有唯一 key？

代码提交前：
- [ ] 没有 TypeScript 错误
- [ ] 没有控制台警告
- [ ] 代码格式统一
- [ ] 变量命名清晰
- [ ] 文件放在正确的目录

## 💡 最佳实践

### 1. 状态管理
```typescript
// ✅ 推荐 - 状态与UI解耦
const [data, setData] = useState<Data[]>([]);
const filteredData = useMemo(() => {
  return data.filter(/* 筛选逻辑 */);
}, [data]);

// ❌ 避免 - 冗余状态
const [data, setData] = useState<Data[]>([]);
const [filteredData, setFilteredData] = useState<Data[]>([]);
```

### 2. 事件处理
```typescript
// ✅ 推荐 - 使用 useCallback
const handleClick = useCallback((id: number) => {
  // 处理逻辑
}, []);

// ✅ 推荐 - 内联简单函数
<Button onClick={() => console.log('clicked')}>
```

### 3. 条件渲染
```typescript
// ✅ 推荐
{data.length > 0 ? (
  <DataTable data={data} />
) : (
  <EmptyState />
)}

// ✅ 推荐 - 简单条件
{loading && <Spinner />}
```

## 🔗 相关文档

- [架构设计](./ARCHITECTURE.md)
- [开发指南](./DEVELOPMENT_GUIDE.md)
- [项目结构](./PROJECT_STRUCTURE.md)
- [README](../README.md)
