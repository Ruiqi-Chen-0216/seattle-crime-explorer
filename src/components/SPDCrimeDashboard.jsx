import React from 'react';
import DashboardHeader from './common/DashboardHeader';
import DashboardFooter from './common/DashboardFooter';
import VegaChart from './common/VegaChart';
import TableauViz from './common/TableauViz';
import { useTableau } from '../hooks/useTableau';

// ── Reusable section wrapper ──────────────────────────────────────────────────
const Section = ({ id, bg = 'bg-white', children }) => (
  <section id={id} className={`${bg} py-16`}>
    <div className="max-w-5xl mx-auto px-6">{children}</div>
  </section>
);

// ── Section heading ───────────────────────────────────────────────────────────
const SectionQuestion = ({ step, question }) => (
  <div className="mb-6">
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
      {step}
    </p>
    <h2 className="text-2xl font-extrabold text-[#383838] leading-snug">{question}</h2>
  </div>
);

// ── Image placeholder ─────────────────────────────────────────────────────────
const Placeholder = ({ label, height = 340 }) => (
  <div
    className="w-full rounded bg-gray-100 border-2 border-dashed border-gray-300
                flex flex-col items-center justify-center text-gray-400 text-sm"
    style={{ height }}
  >
    <svg className="w-8 h-8 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
      <path d="M21 15l-5-5L5 21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="font-medium">{label}</span>
    <span className="text-xs mt-1 text-gray-300">Visualization coming soon</span>
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────
const SPDCrimeDashboard = () => {
  const { isTableauLoaded } = useTableau();

  return (
    <div className="bg-[#FAFAFA] font-sans">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <DashboardHeader />

      {/* ── Section 1: Where ─────────────────────────────────────────────── */}
      <Section id="where" bg="bg-white">
        <SectionQuestion
          step="01 — Where"
          question="Where are incidents concentrated across Seattle?"
        />
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-2">
          This map provides the broadest view of reported crime across Seattle,
          helping you quickly identify which neighborhoods have the highest total
          incident counts and where crime is spatially concentrated.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-1">
          Capitol Hill, Queen Anne, and Downtown Commercial consistently rank among
          the highest-crime neighborhoods — use this as your starting point before
          diving into crime type and timing in the sections below.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          Data: SPD reported incidents 2017–2025 · City of Seattle Open Data Portal
        </p>
        <div className="w-full rounded overflow-hidden shadow-sm">
          <iframe
            src="https://lookerstudio.google.com/reporting/e2d7f9f8-1fcf-4af6-af57-53b0a22b7ccd/page/p_f5whwm0f1d"
            style={{ width: '100%', height: '560px', border: 0 }}
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            title="Seattle Crime Map by Neighborhood"
          />
        </div>
      </Section>

      {/* ── Section 2: What ──────────────────────────────────────────────── */}
      <Section id="what" bg="bg-[#FAFAFA]">
        <SectionQuestion
          step="02 — What"
          question="What types of crime define each neighborhood — and how do they differ?"
        />
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-2">
          This radar chart provides a severity-weighted crime type ranking by
          neighborhood — use the checkbox panel to select any two neighborhoods
          and see how their crime composition diverges.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-1">
          For example, Capitol Hill and Downtown Seattle share high percentiles of
          larceny, burglary, and assault. On the other hand, Downtown diverges with
          high percentiles in human trafficking, gambling, and liquor law violations,
          which rarely appear in Capitol Hill's profile.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          Each axis shows the percentile of each crime type for the selected
          neighborhood (2017–2025).
        </p>
        {isTableauLoaded ? (
          <TableauViz
            vizUrl="https://public.tableau.com/views/SeattleCrimeWatch_17731183365030/CityWideRadarChart"
            height={700}
            hideTabs={false}
            hideToolbar={false}
          />
        ) : (
          <Placeholder label="Loading Tableau radar chart…" height={700} />
        )}
      </Section>

      {/* ── Section 3: When ──────────────────────────────────────────────── */}
      <Section id="when" bg="bg-white">
        <SectionQuestion
          step="03 — When"
          question="When do the most common crime types tend to occur across the day?"
        />
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-8">
          After identifying the most prominent crime categories, these views show
          when those crimes are most likely to occur. Two neighborhoods may share
          the same dominant crime type but differ in when incidents are most common
          — connecting crime composition to temporal rhythm.
        </p>

        <VegaChart
          specUrl="/crime_hourly_chart.json"
          title="How Does Each Crime Type Vary Across the Day?"
          description="Line chart showing hourly incident counts for the top 10 crime sub-categories. Drag the slider to select an hour and watch the ranking update below."
        />

        <VegaChart
          specUrl="/crime_bubble_chart.json"
          title="Top 10 Crime Types by Hour — Animated Ranking"
          description="Each bubble = one crime type. X-position and size encode incident volume; Y-position shows rank. Drag the slider across 30-minute steps to see how rankings shift throughout the day."
        />
      </Section>

      {/* ── Section 4: Context ───────────────────────────────────────────── */}
      <Section id="context" bg="bg-[#FAFAFA]">
        <SectionQuestion
          step="04 — Context"
          question="Do neighborhoods with lower median incomes see higher crime counts?"
        />
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-2">
          The bar chart ranks every Seattle neighborhood by total crime count and
          encodes median household income through color — darker bars indicate
          higher income. A clear pattern emerges: the neighborhoods with the most
          reported crime tend to also be those with the lowest median incomes.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-1">
          Switch to the <em>Treemap</em> tab for a proportional area view, or the
          <em> Time Series</em> tab to see how per-capita crime rates have shifted
          across years for each neighborhood.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          This relationship is contextual, not causal — income correlates with
          many other neighborhood factors including density, land use, and
          reporting rates.
        </p>
        {isTableauLoaded ? (
          <TableauViz
            vizUrl="https://public.tableau.com/views/Final_Visualization_17727382627890/BarChartIncomesandCrimeCount?:publish=yes"
            height={700}
            hideTabs={false}
            hideToolbar={false}
          />
        ) : (
          <Placeholder label="Loading Tableau income chart…" height={700} />
        )}
      </Section>

      {/* ── Section 5: Closing ───────────────────────────────────────────── */}
      <Section id="closing" bg="bg-[#383838]">
        <h2 className="text-xl font-extrabold text-white mb-4">
          How to Use These Views Together
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { step: '01', label: 'Where', desc: 'The map shows where crime is spatially concentrated across neighborhoods.' },
            { step: '02', label: 'What', desc: 'The radar chart shows what types of crime dominate in selected neighborhoods.' },
            { step: '03', label: 'When', desc: 'The hourly views show when those crime types most commonly occur.' },
            { step: '04', label: 'Context', desc: 'The scatter view situates neighborhoods within a broader socioeconomic frame.' },
          ].map(({ step, label, desc }) => (
            <div key={step} className="bg-white/10 rounded p-4">
              <p className="text-xs font-bold text-gray-400 mb-1">{step} — {label}</p>
              <p className="text-sm text-gray-200 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
          Reported incidents do not represent a complete measure of safety, and
          neighborhood-level summaries may hide substantial variation within
          neighborhoods. These visualizations are intended for exploration and
          comparison rather than definitive ranking.
        </p>
      </Section>

      <DashboardFooter />
    </div>
  );
};

export default SPDCrimeDashboard;
