# QuantOps 量化后台管理系统

一个专业的企业级量化交易后台管理系统，采用现代化的前端架构，提供市场行情数据、成交数据和长期标签的管理功能。

## ✨ 特性

- 🎨 **企业级UI设计** - 深色侧边栏 + 浅色内容区，简洁专业
- 📊 **数据管理** - 市场行情、成交数据、长期标签三大核心功能
- 🔍 **高级筛选** - 支持多条件筛选和快速搜索
- 📄 **分页展示** - 优化大数据量展示性能
- 💾 **数据导入导出** - 支持 CSV 格式数据交换
- 🎯 **类型安全** - 完整的 TypeScript 类型定义
- 🏗️ **规范架构** - 分层清晰，易于维护和扩展

## 🚀 快速开始

### 项目结构

```
/
├── App.tsx                          # 应用入口
├── types/                           # 类型定义（集中管理）
├── constants/                       # 常量配置（导航、表格等）
├── services/                        # API服务层（Mock/真实API）
├── hooks/                           # 自定义Hooks（可复用逻辑）
├── lib/                             # 工具函数库（格式化等）
├── mocks/                           # Mock数据（开发测试）
├── components/
│   ├── layout/                      # 布局组件
│   ├── common/                      # 通用业务组件
│   ├── pages/                       # 页面组件
│   └── ui/                          # 基础UI组件
├── docs/                            # 文档
│   ├── ARCHITECTURE.md              # 架构设计文档
│   └── DEVELOPMENT_GUIDE.md         # 开发指南
└── styles/
    └── globals.css                  # 全局样式
```

## 📦 核心功能模块

### 1. 市场行情基础数据
- 15个完整字段（thscode、tradeDate、open、close等）
- 支持股票代码、日期筛选
- 涨跌幅自动计算和颜色标识
- 导入/导出功能

### 2. 成交数据
- 基于主表计算生成
- 买入/卖出量和金额统计
- 净买入分析
- 平均买卖价计算

### 3. 长期标签表
- 股票长期维度标签管理
- 行业、板块分类
- 财务指标（PE、PB、ROE等）
- 风险等级评估

### 4. 仪表盘
- 数据概览
- 关键指标展示

### 5. 系统设置
- 用户配置
- 系统偏好设置

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型系统
- **Tailwind CSS** - 样式方案
- **Lucide React** - 图标库

## 📐 架构设计

### 分层架构

```
┌─────────────────────────────────────┐
│       Pages Layer (页面层)           │
│   组合各种组件实现完整页面功能         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Components Layer (组件层)         │
│  Layout / Common / Features / UI    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Hooks Layer (逻辑层)             │
│   可复用的业务逻辑抽象                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Services Layer (服务层)           │
│   API调用、数据获取和处理             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Utils/Lib Layer (工具层)          │
│   纯函数工具集、格式化、验证等         │
└─────────────────────────────────────┘
```

### 数据流

```
Mock Data → Service Layer → Custom Hooks → Page Components → UI Components
```

## 📝 代码规范

### 文件命名
- 组件文件：`PascalCase.tsx`
- Hook文件：`useCamelCase.ts`
- 类型文件：`kebab-case.ts`
- 工具文件：`kebab-case.ts`

### 组件结构
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
  
  // 3.2 事件处理
  const handleClick = () => {};
  
  // 3.3 渲染
  return <div>{/* JSX */}</div>;
}
```

## 🔧 开发指南

### 添加新页面

1. **定义类型** - 在 `/types/` 中创建类型文件
2. **创建Mock数据** - 在 `/mocks/` 中创建数据文件
3. **创建服务** - 在 `/services/` 中创建API服务
4. **添加导航** - 在 `/constants/navigation.ts` 中配置
5. **创建页面** - 在 `/components/pages/` 中实现
6. **注册路由** - 在 `/App.tsx` 中添加路由

详细开发指南请查看：[开发指南文档](./docs/DEVELOPMENT_GUIDE.md)

### 代码审查清单

- ✅ 代码符合项目架构规范
- ✅ 所有变量都有明确的 TypeScript 类型
- ✅ 组件职责单一，逻辑清晰
- ✅ 常量统一在 constants 中定义
- ✅ 公共逻辑提取为 Hook 或工具函数
- ✅ 使用 Tailwind CSS，避免内联样式
- ✅ 列表渲染都有唯一 key

## 📚 文档

- [架构设计文档](./docs/ARCHITECTURE.md) - 详细的架构设计和原则
- [开发指南](./docs/DEVELOPMENT_GUIDE.md) - 开发规范和常见场景
- [项目结构详解](./docs/PROJECT_STRUCTURE.md) - 完整的目录结构说明
- [快速参考指南](./docs/QUICK_REFERENCE.md) - 常用代码模板和快速查询
- [架构概览](./docs/ARCHITECTURE_OVERVIEW.md) - 一图看懂完整架构
- [文档索引](./docs/INDEX.md) - 文档导航和使用指南
- [变更日志](./CHANGELOG.md) - 版本更新记录

## 🎯 下一步开发建议

### 短期目标
1. ✅ 完善其他页面组件（TransactionDataPage、LongTermTagsPage等）
2. ⬜ 集成真实 API 接口
3. ⬜ 添加表单验证（React Hook Form + Zod）
4. ⬜ 实现数据可视化（Recharts）

### 中期目标
5. ⬜ 集成状态管理（Zustand）
6. ⬜ 添加权限控制系统
7. ⬜ 优化性能（虚拟滚动、懒加载）
8. ⬜ 完善错误处理和用户提示

### 长期目标
9. ⬜ 添加单元测试和集成测试
10. ⬜ 实现响应式设计（移动端适配）
11. ⬜ 国际化支持（i18n）
12. ⬜ 主题切换功能

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证

## 👥 维护团队

QuantOps 开发团队

---

**注意事项：**
- 当前使用 Mock 数据进行开发，实际部署需要集成真实 API
- Figma Make 不适合收集 PII 或处理敏感数据
- 建议在生产环境中添加适当的安全措施和数据验证