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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              This map provides the broadest view of reported crime across Seattle.
              It helps users quickly identify which neighborhoods have the highest
              total incident counts and where crime is spatially concentrated.
            </p>
            <p>
              Because this is the entry point for the page, selecting a neighborhood
              here updates the comparison views below. The map begins with the two
              highest-count neighborhoods pre-selected so users can immediately move
              from <em>where</em> to <em>what kind</em>.
            </p>
            <p className="text-xs text-gray-400 pt-2">
              Data: SPD reported incidents 2017–2025 · Source: City of Seattle Open Data Portal
            </p>
          </div>
          <Placeholder label="Map — Total Crime Count by Neighborhood" height={360} />
        </div>
      </Section>

      {/* ── Section 2: What ──────────────────────────────────────────────── */}
      <Section id="what" bg="bg-[#FAFAFA]">
        <SectionQuestion
          step="02 — What"
          question="What types of crime define each neighborhood — and how do they differ?"
        />
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-2">
          Similar overall crime counts don't mean similar crime profiles. This radar
          chart compares the share of each offense type across Seattle neighborhoods
          — use the checkbox panel to select any two neighborhoods and see how their
          crime composition diverges.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-1">
          For example, Capitol Hill and Downtown Seattle share high rates of
          larceny, burglary, and assault — but Downtown stands apart with elevated
          levels of human trafficking, gambling offenses, and liquor law violations,
          categories that barely register in Capitol Hill.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          Each axis shows the neighborhood's share of that crime type relative to
          the citywide distribution (2017–2025).
        </p>
        {isTableauLoaded ? (
          <TableauViz
            vizUrl="https://public.tableau.com/views/SeattleCrimeWatch/CityWideRadarChart"
            height={700}
            hideTabs={true}
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
          question="How do crime counts relate to neighborhood median income?"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              The final view adds neighborhood context by comparing crime counts
              with neighborhood median income. This does not imply a simple causal
              relationship, but it helps users explore whether high-crime
              neighborhoods tend to share broader socioeconomic characteristics.
            </p>
            <p>
              Neighborhoods selected in previous views are highlighted here,
              allowing users to situate their comparison within the citywide
              income spectrum.
            </p>
            <p className="text-xs text-gray-400 pt-2 border-t border-gray-200">
              This view should be interpreted as contextual rather than causal.
              It is intended to support comparison, not to reduce crime patterns
              to a single socioeconomic explanation.
            </p>
          </div>
          <Placeholder label="Scatter — Crime Count × Neighborhood Median Income" height={360} />
        </div>
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
