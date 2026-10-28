import { Leaf } from 'lucide-react';
import { NAV_LINKS } from '../config';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row">
        <a href="#" className="flex items-center gap-2 text-primary">
          <Leaf className="h-5 w-5" />
          <span className="text-lg font-semibold">Aurora</span>
        </a>

        <nav className="flex flex-wrap justify-center gap-5">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="transition hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>

        <p>&copy; {new Date().getFullYear()} Aurora. All rights reserved.</p>
      </div>
    </footer>
  );
}