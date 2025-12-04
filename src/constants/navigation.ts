import { LayoutDashboard, TrendingUp, Calculator, Tag, Settings } from 'lucide-react';
import type { PageType } from '../types';

export interface NavigationItem {
  id: PageType;
  label: string;
  icon: typeof LayoutDashboard;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'dashboard', label: '仪表盘 Dashboard', icon: LayoutDashboard },
  { id: 'market-data', label: '市场行情基础数据', icon: TrendingUp },
  { id: 'transaction-data', label: '成交数据', icon: Calculator },
  { id: 'long-term-tags', label: '长期标签表', icon: Tag },
  { id: 'settings', label: '设置 Settings', icon: Settings },
];

export const APP_CONFIG = {
  name: 'QuantOps 量化后台',
  logo: 'Q',
  defaultPage: 'market-data' as PageType,
};
