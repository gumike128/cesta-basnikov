import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Feather,
  GalleryHorizontal,
  Calendar,
  LogOut,
  BookMarked,
  ArrowLeft,
  Settings,
  BarChart3,
} from 'lucide-react';
const adminNavLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/analytics', label: 'Analytika', icon: BarChart3 },
  { to: '/admin/poets', label: 'Básnici', icon: Feather },
  { to: '/admin/gallery', label: 'Galéria', icon: GalleryHorizontal },
  { to: '/admin/events', label: 'Podujatia', icon: Calendar },
  { to: '/admin/settings', label: 'Nastavenia', icon: Settings },
];
export function AdminSidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-secondary text-secondary-foreground">
      <div className="flex h-20 items-center border-b px-6">
        <NavLink to="/admin/dashboard" className="flex items-center gap-2">
          <BookMarked className="h-8 w-8 text-primary" />
          <span className="font-display text-xl font-bold">Admin Panel</span>
        </NavLink>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {adminNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                  : 'text-secondary-foreground/80'
              )
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto space-y-2 border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
            <NavLink to="/">
                <ArrowLeft className="h-5 w-5" />
                <span>Späť na web</span>
            </NavLink>
        </Button>
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 text-red-500 hover:bg-red-500/10 hover:text-red-500">
          <LogOut className="h-5 w-5" />
          <span>Odhlásiť sa</span>
        </Button>
      </div>
    </aside>
  );
}