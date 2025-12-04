import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900">设置 Settings</h1>
        <p className="text-slate-500 mt-1">系统配置与偏好设置</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>基本设置</CardTitle>
          <CardDescription>配置系统的基本信息和参数</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">系统名称</label>
            <Input defaultValue="QuantOps 量化后台" />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-2">默认分页大小</label>
            <Input type="number" defaultValue="10" />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>通知设置</CardTitle>
          <CardDescription>配置系统通知和提醒</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-900">数据更新通知</div>
              <div className="text-xs text-slate-500 mt-1">当数据更新时接收通知</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-900">异常报警</div>
              <div className="text-xs text-slate-500 mt-1">当检测到数据异常时发送报警</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">保存设置</Button>
      </div>
    </div>
  );
}
