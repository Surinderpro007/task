import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getFaqs } from '../api/api';

// A single FAQ row. `open` and `onToggle` come from the parent.
function FaqItem({ faq, open, onToggle }) {
  return (
    <div className="rounded-lg border border-line bg-white">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${faq.id}`}
        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {faq.question}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* grid-rows trick: animates height without needing a fixed height */}
      <div
        id={`faq-panel-${faq.id}`}
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm text-muted">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Only one FAQ can be open at a time, so a single id is enough
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    getFaqs()
      .then((data) => {
        setFaqs(data);
        setOpenId(data[0]?.id ?? null); // first FAQ starts open
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <p className="mt-2 text-sm text-muted">Find quick answers to the most common questions.</p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-12 rounded-lg" />
          ))}

        {error && (
          <p className="text-center text-sm text-red-600" role="alert">
            Could not load FAQs. Please try again later.
          </p>
        )}

        {faqs.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            open={openId === faq.id}
            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        ))}
      </div>
    </section>
  );
}