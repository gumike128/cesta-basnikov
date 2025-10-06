import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
const navLinks = [
  { to: '/', label: 'Úvod' },
  { to: '/o-projekte', label: 'O projekte' },
  { to: '/mapa', label: 'Mapa' },
  { to: '/basnici', label: 'Básnici' },
  { to: '/galeria', label: 'Galéria' },
  { to: '/podujatia', label: 'Podujatia' },
  { to: '/kontakt', label: 'Kontakt' },
];
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <Logo className="h-8 w-8" />
          <span className="font-display text-2xl font-bold text-foreground">Cesta básnikov</span>
        </NavLink>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
           <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground flex items-center gap-2 ml-2',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )
              }
            >
              <UserCog className="h-4 w-4" />
              Admin
            </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="relative top-0 right-0" />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="bg-background md:hidden">
          <nav className="container flex flex-col space-y-2 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
             <NavLink
                to="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground flex items-center gap-2 mt-2 border-t pt-4',
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )
                }
              >
                <UserCog className="h-5 w-5" />
                Admin
              </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}