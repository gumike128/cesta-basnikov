import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { Logo } from './Logo';
const navLinks = [
    { to: '/o-projekte', label: 'O projekte' },
    { to: '/mapa', label: 'Mapa' },
    { to: '/basnici', label: 'Básnici' },
    { to: '/galeria', label: 'Galéria' },
    { to: '/podujatia', label: 'Podujatia' },
    { to: '/kontakt', label: 'Kontakt' },
    { to: '/admin/login', label: 'Admin Login' },
];
export function Footer() {
  const settings = useSettingsStore((state) => state.settings);
  const socialLinks = [
    { icon: Facebook, href: settings.facebookUrl },
    { icon: Instagram, href: settings.instagramUrl },
    { icon: Youtube, href: settings.youtubeUrl },
  ].filter(link => link.href);
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container section-padding !py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-3 lg:col-span-1">
            <NavLink to="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-display text-2xl font-bold">Cesta básnikov</span>
            </NavLink>
            <p className="mt-4 text-body !text-secondary-foreground/70">
              Kultúrno-turistický projekt spájajúci umenie, prírodu a poéziu v Strážovských vrchoch.
            </p>
          </div>
          <div className="lg:col-start-3">
            <h3 className="font-semibold uppercase tracking-wider text-secondary-foreground/90">Navigácia</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-secondary-foreground/70 transition-colors hover:text-primary">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-secondary-foreground/90">Sledujte nás</h3>
            <div className="mt-4 flex space-x-4">
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                        <link.icon className="h-6 w-6" />
                    </a>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Cesta básnikov. Všetky práva vyhradené.</p>
          <p className="mt-1">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}