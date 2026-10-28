import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../config';

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-width banner image */}
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_30%]"
      />
      {/* Light gradient on the left so the text stays readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/60 to-transparent md:from-white/80 md:via-white/30" />

      <div className="container-page py-14 sm:py-20 md:py-24">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink">New Collection</p>
          <h1 className="mt-3 text-4xl font-medium leading-tight text-primary-dark sm:text-5xl">
            Discover Your
            <br />
            Perfect Style
          </h1>
          <p className="mt-4 max-w-xs text-base text-ink/80">
            Trendy looks, premium quality, made for your everyday life.
          </p>
          <a href="#shop" className="btn-primary mt-6">
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}