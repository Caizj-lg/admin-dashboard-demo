import {
  LayoutDashboard,
  TrendingUp,
  Calculator,
  Tag,
  Settings,
} from "lucide-react";
import type { PageType } from "../types";

export interface NavigationItem {
  id: PageType;
  label: string;
  icon: typeof LayoutDashboard;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "dashboard", label: "仪表盘", icon: LayoutDashboard },
  {
    id: "market-data",
    label: "市场行情基础数据",
    icon: TrendingUp,
  },
  {
    id: "transaction-data",
    label: "交易明细表",
    icon: Calculator,
  },
  { id: "long-term-tags", label: "长期标签表", icon: Tag },
  { id: "settings", label: "设置", icon: Settings },
];

export const APP_CONFIG = {
  name: "量化交易后台管理系统",
  logo: "C",
  defaultPage: "market-data" as PageType,
};