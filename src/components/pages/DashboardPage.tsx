import {
  TrendingUp,
  TrendingDown,
  Activity,
  Database,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900">仪表盘</h1>
        <p className="text-slate-500 mt-1">
          系统概览与关键指标
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              总数据量
            </CardTitle>
            <Database className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">1,234,567</div>
            <p className="text-xs text-slate-500 mt-1">
              市场行情数据条数
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              成交数据
            </CardTitle>
            <Activity className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">987,654</div>
            <p className="text-xs text-slate-500 mt-1">
              计算生成的成交记录
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              今日涨幅
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-green-600">+2.34%</div>
            <p className="text-xs text-slate-500 mt-1">
              市场平均涨幅
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              今日跌幅
            </CardTitle>
            <TrendingDown className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-red-600">-1.23%</div>
            <p className="text-xs text-slate-500 mt-1">
              市场平均跌幅
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            欢迎使用 Caizj的量化交易后台管理系统V1.0
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">这里用来数据占位</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              无聊的时候可以试玩一下我开发的打砖块游戏：https://caizj-lg.github.io/block-breaker-game
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}