# 快速上手指南

欢迎使用 QuantOps 量化后台管理系统！本指南将帮助你在 5 分钟内了解项目并开始开发。

## 🎯 5分钟快速了解

### 1️⃣ 项目是什么？
QuantOps 是一个专业的企业级后台管理系统，用于管理：
- 📊 市场行情数据
- 💹 成交数据
- 🏷️ 股票长期标签

### 2️⃣ 技术栈
- React 18 + TypeScript
- Tailwind CSS
- 完整的类型定义
- 规范的代码架构

### 3️⃣ 核心特点
✅ 分层清晰，易于维护  
✅ 类型安全，减少错误  
✅ 组件化设计，高度复用  
✅ Mock数据，开发友好  
✅ 完善文档，快速上手  

## 📂 项目结构一览

```
QuantOps/
├── types/          ← 所有类型定义
├── mocks/          ← Mock数据（开发用）
├── services/       ← API调用封装
├── hooks/          ← 可复用逻辑
├── lib/            ← 工具函数
├── constants/      ← 配置和常量
└── components/     ← React组件
    ├── layout/     ← 布局（侧边栏、顶栏）
    ├── common/     ← 通用组件（分页等）
    ├── pages/      ← 页面组件
    └── ui/         ← 基础UI组件
```

**快速定位：**
- 想找类型定义？→ `/types/`
- 想找Mock数据？→ `/mocks/`
- 想找页面代码？→ `/components/pages/`
- 想找工具函数？→ `/lib/`

## 🚀 第一次使用

### Step 1: 浏览项目
1. 打开主入口 `/App.tsx` - 看看路由是怎么配置的
2. 打开 `/components/pages/MarketDataPage.tsx` - 看一个完整的页面示例
3. 打开 `/types/market-data.ts` - 看类型是怎么定义的

### Step 2: 理解数据流
```
Mock数据 (/mocks/) 
  ↓
服务层 (/services/) 
  ↓
自定义Hook (/hooks/)
  ↓
页面组件 (/components/pages/)
  ↓
UI组件 (/components/ui/)
```

### Step 3: 查看文档
- 📖 [README.md](./README.md) - 项目概览
- 🏗️ [架构概览](./docs/ARCHITECTURE_OVERVIEW.md) - 一图看懂架构
- 📚 [文档索引](./docs/INDEX.md) - 找到你需要的文档

## 💻 开始开发

### 场景 1: 我要修改现有页面

**例如：给市场数据页面添加一个按钮**

1. 打开 `/components/pages/MarketDataPage.tsx`
2. 找到 `<PageHeader>` 组件
3. 在 `actions` 属性中添加你的按钮：
```typescript
<Button className="gap-2 bg-blue-600 hover:bg-blue-700">
  <YourIcon className="w-4 h-4" />
  新按钮
</Button>
```

### 场景 2: 我要添加新页面

**例如：添加一个"策略管理"页面**

#### 第1步：创建类型定义
```typescript
// /types/strategy.ts
export interface Strategy {
  id: number;
  name: string;
  // ... 其他字段
}
```

#### 第2步：创建Mock数据
```typescript
// /mocks/strategy.mock.ts
import type { Strategy } from '../types/strategy';

export const MOCK_STRATEGY_DATA: Strategy[] = [
  { id: 1, name: '策略A' },
  // ... 更多数据
];
```

#### 第3步：创建页面组件
```typescript
// /components/pages/StrategyPage.tsx
import { PageHeader } from '../common/PageHeader';
import { MOCK_STRATEGY_DATA } from '../../mocks/strategy.mock';

export function StrategyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="策略管理" />
      {/* 你的内容 */}
    </div>
  );
}
```

#### 第4步：添加导航
```typescript
// /constants/navigation.ts
import { Target } from 'lucide-react';

export const NAVIGATION_ITEMS = [
  // ... 现有导航
  { id: 'strategy', label: '策略管理', icon: Target },
];
```

#### 第5步：注册路由
```typescript
// /App.tsx
import { StrategyPage } from './components/pages/StrategyPage';

// 在 types/index.ts 中添加类型
export type PageType = '...' | 'strategy';

// 在 renderPage 中添加
case 'strategy':
  return <StrategyPage />;
```

✅ 完成！你的新页面已经可以访问了。

### 场景 3: 我要添加工具函数

**例如：添加一个格式化股票代码的函数**

```typescript
// /lib/formatters.ts
export function formatStockCode(code: string): string {
  // 确保格式为 6位数字.交易所
  return code.toUpperCase();
}
```

使用：
```typescript
import { formatStockCode } from '../../lib/formatters';

{formatStockCode(row.thscode)}
```

## 🎨 常用代码片段

### 创建一个卡片
```typescript
<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
  </CardHeader>
  <CardContent>
    {/* 内容 */}
  </CardContent>
</Card>
```

### 创建一个按钮
```typescript
<Button className="gap-2 bg-blue-600 hover:bg-blue-700">
  <Icon className="w-4 h-4" />
  按钮文字
</Button>
```

### 创建一个输入框
```typescript
<Input
  placeholder="请输入..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### 创建一个表格
```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>列1</TableHead>
      <TableHead>列2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.value1}</TableCell>
        <TableCell>{row.value2}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## 🔍 快速查询表

| 我想... | 查看文件/文档 |
|--------|-------------|
| 了解项目概况 | [README.md](./README.md) |
| 看架构图 | [架构概览](./docs/ARCHITECTURE_OVERVIEW.md) |
| 找代码模板 | [快速参考](./docs/QUICK_REFERENCE.md) |
| 学习开发规范 | [开发指南](./docs/DEVELOPMENT_GUIDE.md) |
| 了解目录结构 | [项目结构](./docs/PROJECT_STRUCTURE.md) |
| 添加新页面 | 👆 上面的"场景2" |
| 格式化数据 | `/lib/formatters.ts` |
| 定义类型 | `/types/` |
| 创建Mock数据 | `/mocks/` |
| 使用分页 | `/hooks/usePagination.ts` |

## ❓ 常见问题

### Q: 代码应该放在哪里？
**A:** 查看 [项目结构文档](./docs/PROJECT_STRUCTURE.md)，里面有详细的目录职责说明。

### Q: 如何定义新的类型？
**A:** 在 `/types/` 目录下创建新文件，参考现有的类型定义。

### Q: Mock数据在哪里？
**A:** 在 `/mocks/` 目录下，每个数据模块都有对应的Mock文件。

### Q: 如何使用工具函数？
**A:** 导入 `/lib/formatters.ts` 中的函数，例如：
```typescript
import { formatPrice } from '../../lib/formatters';
```

### Q: 如何添加新的导航项？
**A:** 修改 `/constants/navigation.ts` 文件。

### Q: 页面样式怎么写？
**A:** 使用 Tailwind CSS 类名，参考 [快速参考文档](./docs/QUICK_REFERENCE.md) 中的"常用样式类"部分。

## 📖 学习路径

### 🌱 初学者（0-2周）
1. ✅ 阅读本文档（快速上手）
2. ✅ 浏览 [README.md](./README.md)
3. ✅ 查看 [项目结构文档](./docs/PROJECT_STRUCTURE.md)
4. ✅ 尝试修改一个现有页面
5. ✅ 使用模板添加一个新页面

### 🚀 进阶者（2-4周）
1. ✅ 深入理解 [架构设计文档](./docs/ARCHITECTURE.md)
2. ✅ 学习 [开发指南](./docs/DEVELOPMENT_GUIDE.md)
3. ✅ 尝试创建自定义Hook
4. ✅ 优化现有代码
5. ✅ 集成真实API

### 💎 专家级（4周+）
1. ✅ 提出架构优化方案
2. ✅ 添加测试覆盖
3. ✅ 性能优化
4. ✅ 指导团队成员

## 🎯 今天就开始

### 👉 推荐第一个任务

**任务：** 给市场数据页面的表格添加一个"备注"列

1. 打开 `/types/market-data.ts`，添加 `remark?: string`
2. 打开 `/mocks/market-data.mock.ts`，在数据中添加 remark 字段
3. 打开 `/components/pages/MarketDataPage.tsx`，在表格中添加一列

这个任务会让你：
- ✅ 熟悉类型定义
- ✅ 了解Mock数据
- ✅ 修改页面组件
- ✅ 完成一个完整的功能

**预计用时：** 10-15分钟

## 🆘 需要帮助？

1. 📚 **先查文档** - [文档索引](./docs/INDEX.md)
2. 🔍 **搜索代码** - 看看类似的功能是怎么实现的
3. 💬 **问团队** - 联系 QuantOps 开发团队

## 📌 重要提示

⚠️ **开发环境**
- 当前使用 Mock 数据
- 真实API需要单独配置

⚠️ **代码规范**
- 遵循 TypeScript 类型定义
- 使用 Tailwind CSS
- 参考现有代码风格

⚠️ **安全性**
- 不要提交敏感信息
- 不要收集PII数据
- 生产环境需要额外的安全措施

## 🎉 开始你的第一次提交

```bash
# 1. 创建功能分支
git checkout -b feature/my-first-feature

# 2. 进行开发...

# 3. 提交代码
git add .
git commit -m "feat: 添加新功能"

# 4. 推送到远程
git push origin feature/my-first-feature
```

---

**祝你开发愉快！** 🚀

有任何问题，随时查看 [文档索引](./docs/INDEX.md) 找到你需要的帮助。
