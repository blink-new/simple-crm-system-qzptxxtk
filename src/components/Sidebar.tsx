import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3,
  CheckSquare,
  Contact2, 
  DollarSign, 
  Home, 
  LayoutDashboard, 
  LifeBuoy, 
  LucideIcon, 
  Settings, 
  Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  title: string;
  isActive?: boolean;
  collapsed?: boolean;
}

function NavItem({ href, icon: Icon, title, isActive, collapsed }: NavItemProps) {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        collapsed ? "justify-center px-2" : "",
        isActive 
          ? "bg-teal text-white" 
          : "text-mint-light hover:bg-white/10 hover:text-white"
      )}
    >
      <Link to={href} className="flex items-center">
        <Icon className="h-5 w-5" />
        {!collapsed && <span>{title}</span>}
      </Link>
    </Button>
  );
}

export function Sidebar({ 
  className, 
  collapsed = false,
  ...props 
}: SidebarNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { href: '/', icon: LayoutDashboard, title: 'Dashboard' },
    { href: '/pipeline', icon: CheckSquare, title: 'Pipeline' },
    { href: '/contacts', icon: Contact2, title: 'Contacts' },
    { href: '/deals', icon: DollarSign, title: 'Deals' },
    { href: '/team', icon: Users, title: 'Team' },
    { href: '/analytics', icon: BarChart3, title: 'Analytics' },
  ];

  const secondaryNavItems = [
    { href: '/settings', icon: Settings, title: 'Settings' },
    { href: '/help', icon: LifeBuoy, title: 'Help' },
  ];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-teal transition-all duration-300 border-r border-teal-dark",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center px-4 border-b border-teal-dark">
        <Link to="/" className="flex items-center space-x-2">
          {/* Logo */}
          <div className="rounded-md bg-white p-1">
            <Home className="h-6 w-6 text-teal" />
          </div>
          {!collapsed && <span className="text-white font-bold text-lg">SalesPipe</span>}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            title={item.title}
            isActive={
              item.href === '/' 
                ? currentPath === '/' 
                : currentPath.startsWith(item.href)
            }
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="p-2 space-y-1">
        {secondaryNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            title={item.title}
            isActive={currentPath.startsWith(item.href)}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className={cn(
        "flex items-center p-4 border-t border-teal-dark",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User" />
            <AvatarFallback className="bg-skyblue text-white font-medium">JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="space-y-0.5">
              <div className="text-sm font-medium text-white">Jamie Wilson</div>
              <div className="text-xs text-mint-light">Sales Rep</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}