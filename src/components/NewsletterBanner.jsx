import { useState } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import { subscribeNewsletter } from '../api/api';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="container-page py-6">
      <div className="relative overflow-hidden rounded-2xl bg-mint px-6 py-7 sm:px-10">
        <Leaf
          aria-hidden="true"
          className="absolute -bottom-6 -right-4 h-28 w-28 rotate-12 text-primary/15"
          strokeWidth={1.2}
        />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold text-primary-dark">Stay in the Loop</h2>
            <p className="mt-1 text-sm text-ink/75">
              Get the latest updates, new arrivals, and exclusive offers delivered straight to your
              inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="Email address"
              className="field sm:w-60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary justify-center disabled:opacity-60"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {status === 'success' && (
          <p className="relative mt-3 text-sm font-medium text-primary" role="status">
            Thanks for subscribing!
          </p>
        )}
        {status === 'error' && (
          <p className="relative mt-3 text-sm text-red-600" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}