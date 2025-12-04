# QuantOps 量化后台 - 架构文档

## 项目概述

QuantOps 量化后台是一个专业的企业级后台管理系统，采用现代化的前端技术栈，提供市场行情数据、成交数据和长期标签的管理功能。

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型系统
- **Tailwind CSS** - 样式方案
- **Lucide React** - 图标库

## 项目结构

```
/
├── App.tsx                          # 应用入口
├── types/                           # 类型定义
│   ├── index.ts                     # 通用类型
│   ├── market-data.ts               # 市场数据类型
│   ├── transaction-data.ts          # 成交数据类型
│   └── long-term-tags.ts            # 长期标签类型
├── constants/                       # 常量配置
│   ├── navigation.ts                # 导航配置
│   └── table-config.ts              # 表格配置
├── services/                        # API服务层
│   ├── api.ts                       # API基础配置
│   └── market-data.service.ts       # 市场数据服务
├── hooks/                           # 自定义Hooks
│   └── usePagination.ts             # 分页Hook
├── lib/                             # 工具函数
│   └── formatters.ts                # 格式化工具
├── mocks/                           # Mock数据
│   ├── market-data.mock.ts          # 市场数据Mock
│   ├── transaction-data.mock.ts     # 成交数据Mock
│   └── long-term-tags.mock.ts       # 长期标签Mock
├── components/
│   ├── layout/                      # 布局组件
│   │   ├── MainLayout.tsx           # 主布局
│   │   ├── Sidebar.tsx              # 侧边栏
│   │   └── Header.tsx               # 顶部栏
│   ├── common/                      # 通用业务组件
│   │   ├── PageHeader.tsx           # 页面标题
│   │   └── DataTablePagination.tsx  # 数据表格分页
│   ├── pages/                       # 页面组件
│   │   ├── DashboardPage.tsx        # 仪表盘
│   │   ├── MarketDataPage.tsx       # 市场数据页
│   │   ├── TransactionDataPage.tsx  # 成交数据页
│   │   ├── LongTermTagsPage.tsx     # 长期标签页
│   │   └── SettingsPage.tsx         # 设置页
│   └── ui/                          # 基础UI组件库
└── styles/
    └── globals.css                  # 全局样式

```

## 架构设计原则

### 1. 关注点分离（Separation of Concerns）

- **类型层（types/）** - 统一管理所有TypeScript类型定义
- **数据层（mocks/, services/）** - Mock数据和API服务分离
- **业务逻辑层（hooks/）** - 可复用的业务逻辑抽取为自定义Hooks
- **工具层（lib/）** - 纯函数工具集，无副作用
- **配置层（constants/）** - 常量和配置统一管理
- **展示层（components/）** - UI组件分层组织

### 2. 组件分层策略

#### Layout层 - 布局组件
负责页面的整体布局和结构，不包含具体业务逻辑。

#### Common层 - 通用业务组件
跨页面可复用的业务组件，如PageHeader、Pagination等。

#### Pages层 - 页面组件
具体的页面级组件，组合各种组件实现完整功能。

#### UI层 - 基础UI组件
无业务逻辑的纯展示组件库。

### 3. 数据流设计

```
Mock Data → Service Layer → Custom Hooks → Page Components → UI Components
```

### 4. 命名规范

- **组件文件** - PascalCase (如: `MarketDataPage.tsx`)
- **Hook文件** - camelCase with 'use' prefix (如: `usePagination.ts`)
- **类型文件** - kebab-case (如: `market-data.ts`)
- **常量** - UPPER_SNAKE_CASE (如: `DEFAULT_PAGE_SIZE`)

## 核心功能模块

### 1. 市场行情基础数据（MarketDataPage）
- 显示股票市场行情数据
- 支持按股票代码、日期筛选
- 分页显示
- 导入/导出功能

### 2. 成交数据（TransactionDataPage）
- 显示股票成交数据
- 买入/卖出量和金额统计
- 净买入分析

### 3. 长期标签表（LongTermTagsPage）
- 股票长期维度标签管理
- 行业、板块分类
- 财务指标展示
- 风险等级评估

### 4. 仪表盘（DashboardPage）
- 数据概览
- 关键指标展示

### 5. 设置（SettingsPage）
- 系统配置
- 用户偏好设置

## 扩展指南

### 添加新页面

1. 在 `types/` 中定义数据类型
2. 在 `mocks/` 中创建Mock数据
3. 在 `services/` 中创建API服务
4. 在 `constants/navigation.ts` 中添加导航项
5. 在 `components/pages/` 中创建页面组件
6. 在 `App.tsx` 中注册路由

### 添加新功能模块

1. 创建 `components/features/模块名/` 目录
2. 实现功能相关的子组件
3. 在页面组件中引用

### 集成真实API

1. 修改 `services/api.ts` 中的 `API_BASE_URL`
2. 更新各service文件中的请求逻辑
3. 移除Mock数据依赖

## 最佳实践

### 1. 类型安全
所有数据结构必须有明确的TypeScript类型定义。

### 2. 组件职责单一
每个组件只负责一个功能，保持简洁。

### 3. 可复用性
提取公共逻辑为Hooks，公共UI为组件。

### 4. 性能优化
- 使用 `useMemo` 和 `useCallback` 优化计算
- 合理使用分页减少DOM渲染

### 5. 错误处理
API调用应包含错误处理和用户提示。

## 下一步开发建议

1. **集成状态管理** - 使用 Zustand 或 Redux 管理全局状态
2. **添加表单验证** - 使用 React Hook Form + Zod
3. **实现权限控制** - 添加用户权限和路由守卫
4. **优化性能** - 实现虚拟滚动、懒加载
5. **完善测试** - 添加单元测试和集成测试
6. **集成真实API** - 替换Mock数据为真实后端接口
7. **添加数据可视化** - 使用 Recharts 添加图表
8. **实现响应式设计** - 优化移动端体验

## 维护者

QuantOps 开发团队

## 更新日志

### v1.0.0 (2025-12-03)
- 初始架构搭建
- 实现核心页面功能
- 建立规范的代码结构
