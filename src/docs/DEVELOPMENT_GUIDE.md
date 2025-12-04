# QuantOps 开发指南

## 开发规范

### 代码组织

#### 1. 文件组织原则
- **按功能分层** - 不同职责的代码放在对应的目录
- **就近原则** - 相关的文件放在一起
- **命名清晰** - 文件名要能表达其功能

#### 2. 导入顺序
```typescript
// 1. 第三方库
import { useState } from 'react';
import { Button } from '../ui/button';

// 2. 类型定义
import type { MarketData } from '../../types/market-data';

// 3. 常量和配置
import { TABLE_CONFIG } from '../../constants/table-config';

// 4. 工具函数
import { formatPrice } from '../../lib/formatters';

// 5. Mock数据
import { MOCK_MARKET_DATA } from '../../mocks/market-data.mock';

// 6. 自定义Hooks
import { usePagination } from '../../hooks/usePagination';

// 7. 组件
import { PageHeader } from '../common/PageHeader';
```

### TypeScript 规范

#### 1. 类型定义
```typescript
// ✅ 推荐 - 使用 interface 定义对象类型
export interface MarketData {
  id: number;
  thscode: string;
  // ...
}

// ✅ 推荐 - 使用 type 定义联合类型
export type PageType = 'dashboard' | 'market-data' | 'settings';

// ❌ 避免 - 使用 any
const data: any = {};

// ✅ 推荐 - 明确类型
const data: MarketData = {};
```

#### 2. Props 类型
```typescript
// ✅ 推荐 - 单独定义 Props 接口
interface PageHeaderProps {
  title: string;
  description?: string;  // 可选属性
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  // ...
}
```

### 组件开发规范

#### 1. 组件结构
```typescript
// 1. 导入
import { useState } from 'react';
import type { MarketData } from '../../types/market-data';

// 2. 类型定义
interface ComponentProps {
  data: MarketData[];
}

// 3. 组件实现
export function Component({ data }: ComponentProps) {
  // 3.1 Hooks
  const [state, setState] = useState();
  
  // 3.2 事件处理函数
  const handleClick = () => {
    // ...
  };
  
  // 3.3 渲染
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

#### 2. 组件拆分原则
- 单个组件不超过 200 行
- 重复的UI模式提取为组件
- 复杂的业务逻辑提取为 Hook

### 自定义 Hook 开发

#### 1. Hook 命名
所有自定义 Hook 必须以 `use` 开头。

```typescript
// ✅ 推荐
export function usePagination() {}
export function useMarketData() {}

// ❌ 避免
export function pagination() {}
```

#### 2. Hook 设计
```typescript
export function usePagination<T>(data: T[], defaultPageSize = 10) {
  // 1. 内部状态
  const [currentPage, setCurrentPage] = useState(1);
  
  // 2. 计算逻辑
  const currentData = useMemo(() => {
    // ...
  }, [data, currentPage]);
  
  // 3. 操作方法
  const goToPage = (page: number) => {
    // ...
  };
  
  // 4. 返回接口
  return {
    currentPage,
    currentData,
    goToPage,
  };
}
```

### 工具函数开发

#### 1. 纯函数原则
工具函数应该是纯函数，无副作用。

```typescript
// ✅ 推荐 - 纯函数
export function formatPrice(value: number): string {
  return value.toFixed(2);
}

// ❌ 避免 - 有副作用
let cache = {};
export function formatPrice(value: number): string {
  cache[value] = value.toFixed(2);  // 修改外部变量
  return cache[value];
}
```

#### 2. 函数文档
```typescript
/**
 * 格式化价格（保留2位小数）
 * @param value - 原始数值
 * @returns 格式化后的字符串
 * @example
 * formatPrice(13.456) // "13.46"
 */
export function formatPrice(value: number): string {
  return value.toFixed(2);
}
```

### 样式规范

#### 1. Tailwind 使用原则
```typescript
// ✅ 推荐 - 使用语义化的 Tailwind 类
<div className="flex items-center justify-between px-6 py-4">

// ❌ 避免 - 内联样式
<div style={{ display: 'flex', padding: '16px 24px' }}>
```

#### 2. 条件样式
```typescript
// ✅ 推荐 - 使用模板字符串
<button
  className={`px-4 py-2 rounded ${
    isActive ? 'bg-blue-600 text-white' : 'bg-slate-100'
  }`}
>

// ✅ 推荐 - 使用工具函数（复杂场景）
import { cn } from '../lib/utils';

<button className={cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-600 text-white',
  !isActive && 'bg-slate-100'
)}>
```

## 常见开发场景

### 场景1: 添加新的数据表格页面

#### 步骤1: 定义数据类型
```typescript
// /types/new-data.ts
export interface NewData {
  id: number;
  name: string;
  // ... 其他字段
}

export interface NewDataFilter {
  name?: string;
  // ... 其他筛选条件
}
```

#### 步骤2: 创建 Mock 数据
```typescript
// /mocks/new-data.mock.ts
import type { NewData } from '../types/new-data';

export const MOCK_NEW_DATA: NewData[] = [
  {
    id: 1,
    name: '示例数据',
    // ...
  },
];
```

#### 步骤3: 创建服务层
```typescript
// /services/new-data.service.ts
import type { NewData } from '../types/new-data';
import { MOCK_NEW_DATA } from '../mocks/new-data.mock';

export async function getNewDataList(filter?: NewDataFilter) {
  // 实现筛选和分页逻辑
}
```

#### 步骤4: 创建页面组件
```typescript
// /components/pages/NewDataPage.tsx
import { useState } from 'react';
import { PageHeader } from '../common/PageHeader';
import { usePagination } from '../../hooks/usePagination';
import { MOCK_NEW_DATA } from '../../mocks/new-data.mock';

export function NewDataPage() {
  const { currentData, currentPage, goToPage } = usePagination(MOCK_NEW_DATA);
  
  return (
    <div className="space-y-6">
      <PageHeader title="新数据页面" />
      {/* 表格和其他内容 */}
    </div>
  );
}
```

#### 步骤5: 添加到导航
```typescript
// /constants/navigation.ts
import { NewIcon } from 'lucide-react';

export const NAVIGATION_ITEMS = [
  // ... 现有导航
  { id: 'new-data', label: '新数据', icon: NewIcon },
];
```

#### 步骤6: 注册路由
```typescript
// /App.tsx
import { NewDataPage } from './components/pages/NewDataPage';

export default function App() {
  const renderPage = () => {
    switch (currentPage) {
      // ... 现有路由
      case 'new-data':
        return <NewDataPage />;
      // ...
    }
  };
}
```

### 场景2: 添加复杂的筛选功能

```typescript
// 创建筛选 Hook
// /hooks/useFilter.ts
export function useFilter<T, F>(
  data: T[],
  filterFn: (item: T, filter: F) => boolean
) {
  const [filter, setFilter] = useState<F>({} as F);
  
  const filteredData = useMemo(() => {
    return data.filter(item => filterFn(item, filter));
  }, [data, filter]);
  
  return {
    filter,
    setFilter,
    filteredData,
    resetFilter: () => setFilter({} as F),
  };
}

// 在页面中使用
function MarketDataPage() {
  const { filter, setFilter, filteredData } = useFilter(
    MOCK_MARKET_DATA,
    (item, filter) => {
      if (filter.thscode && !item.thscode.includes(filter.thscode)) {
        return false;
      }
      return true;
    }
  );
}
```

### 场景3: 集成真实API

```typescript
// 1. 更新 service 文件
// /services/market-data.service.ts
import { apiGet, apiPost, API_ENDPOINTS } from './api';

export async function getMarketDataList(filter?: MarketDataFilter) {
  // 将 Mock 替换为真实 API 调用
  return await apiGet<ApiResponse<MarketData[]>>(
    `${API_ENDPOINTS.MARKET_DATA}?${new URLSearchParams(filter)}`
  );
}

// 2. 在组件中使用
function MarketDataPage() {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getMarketDataList();
        setData(response.data);
      } catch (error) {
        console.error('获取数据失败', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
}
```

## 调试技巧

### 1. 使用 React DevTools
安装 React DevTools 浏览器扩展，查看组件树和状态。

### 2. 类型检查
```bash
# 运行类型检查（如果配置了 TypeScript）
tsc --noEmit
```

### 3. 控制台调试
```typescript
// 在开发环境输出调试信息
if (process.env.NODE_ENV === 'development') {
  console.log('当前数据:', data);
}
```

## 性能优化

### 1. 使用 useMemo
```typescript
const expensiveValue = useMemo(() => {
  return data.filter(/* 复杂计算 */);
}, [data]);
```

### 2. 使用 useCallback
```typescript
const handleClick = useCallback((id: number) => {
  // 处理逻辑
}, []);
```

### 3. 列表优化
```typescript
// 为列表项添加唯一 key
{data.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

## 常见问题

### Q: 如何处理大量数据的表格？
A: 使用分页、虚拟滚动（react-window）或服务端分页。

### Q: 如何管理复杂的表单状态？
A: 使用 React Hook Form 库。

### Q: 如何实现全局状态管理？
A: 可以集成 Zustand 或 Redux Toolkit。

### Q: 如何优化首屏加载速度？
A: 
1. 代码分割和懒加载
2. 优化图片资源
3. 使用CDN
4. 服务端渲染（SSR）

## 代码审查清单

- [ ] 代码符合项目架构规范
- [ ] 所有变量和函数都有明确类型
- [ ] 组件职责单一，逻辑清晰
- [ ] 没有硬编码的常量，都在 constants 中定义
- [ ] 公共逻辑提取为 Hook 或工具函数
- [ ] 样式使用 Tailwind，避免内联样式
- [ ] 列表渲染都有唯一 key
- [ ] 没有控制台警告或错误
- [ ] 代码格式统一

## 资源链接

- [React 官方文档](https://react.dev)
- [TypeScript 官方文档](https://www.typescriptlang.org)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
