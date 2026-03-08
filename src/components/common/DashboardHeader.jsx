import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#where',   label: '01 Where' },
  { href: '#what',    label: '02 What' },
  { href: '#when',    label: '03 When' },
  { href: '#context', label: '04 Context' },
];

const DashboardHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative w-full font-sans">
      {/* ── Sticky nav ────────────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50
                    transition-all duration-500 ease-in-out transform
                    ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="Seattle Crime Explorer" className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#383838]">
              Seattle Crime Explorer
            </span>
          </div>
          <nav className="flex gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs font-medium text-gray-500 hover:text-[#383838] transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-6">
          {/* Top bar */}
          <div className="flex justify-between py-8 text-xs font-bold uppercase tracking-widest text-[#383838]">
            <span>HCDE 511</span>
            <span>Information Visualization</span>
            <span>2026</span>
          </div>

          {/* Big title */}
          <div className="mt-4 mb-8">
            <h1 className="text-[72px] sm:text-[96px] md:text-[120px] font-extrabold
                           text-[#383838] leading-none tracking-tight">
              SEATTLE
            </h1>
            <div className="flex flex-col sm:flex-row items-baseline gap-3 sm:gap-6">
              <h1 className="text-[72px] sm:text-[96px] md:text-[120px] font-extrabold
                             text-[#383838] leading-none tracking-tight">
                CRIME
              </h1>
              <div className="font-light italic text-3xl sm:text-4xl text-gray-400 leading-tight">
                <div>2017</div>
                <div>2025</div>
              </div>
              <h1 className="text-[72px] sm:text-[96px] md:text-[120px] font-extrabold
                             text-[#383838] leading-none tracking-tight">
                DATA
              </h1>
            </div>
          </div>

          {/* Subtitle + description */}
          <div className="max-w-2xl mb-10">
            <p className="text-lg font-semibold text-[#383838] mb-3">
              Seattle Neighborhood Crime Explorer
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Crime in Seattle is not just about where incidents are highest —
              it's about what kinds of crimes dominate, when they occur, and how
              neighborhood context relates to those patterns. This page helps you
              move from a citywide view down to neighborhood composition, temporal
              rhythm, and socioeconomic context.
            </p>
            <p className="text-xs text-gray-400">
              Data: Seattle Police Department incident reports, 2017–2025 ·
              City of Seattle Open Data Portal · 610,461 records
            </p>
          </div>

          {/* Scroll nav */}
          <div className="flex gap-3 pb-12 flex-wrap">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 border border-[#383838] text-[#383838] text-xs
                           font-semibold uppercase tracking-wider rounded
                           hover:bg-[#383838] hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
