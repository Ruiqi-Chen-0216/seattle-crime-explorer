import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Data Source</p>
            <p>Seattle Police Department Crime Data, 2008–Present</p>
            <p className="mt-1">City of Seattle Open Data Portal</p>
            <p className="mt-1 text-gray-400">Cleaned dataset: 610,461 records · 2017–2026</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Key Cleaning Decisions</p>
            <ul className="space-y-1 text-gray-400">
              <li>· Rows with placeholder time 12:01:00 removed</li>
              <li>· Pre-2016 data excluded (poor spatial coverage)</li>
              <li>· Commercial Harbor Island neighborhood excluded</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Course</p>
            <p>HCDE 511 — Information Visualization</p>
            <p className="mt-1">University of Washington · 2026</p>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-6 leading-relaxed">
          These visualizations are intended for exploration and comparison rather
          than definitive ranking. Reported incidents do not represent a complete
          measure of safety or neighborhood quality.
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
