import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="全局搜索..."
            className="pl-10 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-slate-100 rounded-lg px-3 py-2 transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="text-slate-900">管理员</div>
              <div className="text-xs text-slate-500">admin@quantops.com</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>个人资料</DropdownMenuItem>
            <DropdownMenuItem>账户设置</DropdownMenuItem>
            <DropdownMenuItem>系统偏好</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
