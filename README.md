# Seattle Neighborhood Crime Explorer

A scrollytelling data visualization dashboard exploring crime patterns across Seattle neighborhoods from 2017 to 2025.

**Course**: HCDE 511 — Information Visualization (2026) · University of Washington

---

## Project Overview

Crime in Seattle is not just about where incidents are highest — it's about what kinds of crimes dominate, when they occur, and how neighborhood context relates to those patterns. This one-page interactive dashboard guides users through four analytical frames:

1. **Where** — Spatial concentration of reported crime across Seattle neighborhoods
2. **What** — Crime type composition comparison between neighborhoods (radar chart)
3. **When** — Hourly patterns for the most common crime types (interactive Altair/Vega-Lite)
4. **Context** — Crime counts in relation to neighborhood median income

---

## Technology Stack

- **Frontend**: React 18 (Create React App)
- **Styling**: Tailwind CSS
- **Interactive Charts (When section)**: Vega-Lite / vega-embed, loaded via CDN in `index.html` and rendered through `VegaChart.jsx`
- **Tableau Visualizations**: Embedded via Tableau Public JS API (`TableauViz.jsx` + `useTableau.js`)
- **Build / Deploy**: `npm run build` → GitHub Pages via `gh-pages`

---

## Project Structure

```
src/
├── components/
│   ├── SPDCrimeDashboard.jsx     # Main one-page layout (all sections)
│   └── common/
│       ├── DashboardHeader.jsx   # Hero section + sticky nav
│       ├── DashboardFooter.jsx   # Data source + course info
│       ├── VegaChart.jsx         # Wrapper: fetch JSON spec → window.vegaEmbed
│       ├── TableauViz.jsx        # Wrapper: window.tableau.Viz embed
│       └── LoadingIndicator.jsx
├── hooks/
│   └── useTableau.js             # Hook: waits for window.tableau, formats URLs
public/
├── index.html                    # Loads Tableau JS API + vega/vega-lite/vega-embed via CDN
├── crime_hourly_chart.json       # Exported from datavis.ipynb (Altair → Vega-Lite v6)
└── crime_bubble_chart.json       # Exported from datavis.ipynb (Altair → Vega-Lite v6)
```

---

## Embedding Interactive Visualizations

### Altair / Vega-Lite charts (from `datavis.ipynb`)

Charts are exported from the Jupyter notebook as Vega-Lite v6 JSON specs:

```python
chart.save('website/public/my_chart.json')
```

Then rendered in React via `VegaChart`:

```jsx
<VegaChart
  specUrl="/my_chart.json"
  title="Chart Title"
  description="Description shown above the chart."
/>
```

`VegaChart.jsx` uses `window.vegaEmbed` (loaded from CDN in `index.html`) — no webpack bundling needed.

### Tableau Public charts

Use `TableauViz.jsx` with a Tableau Public URL:

```jsx
<TableauViz
  vizUrl="https://public.tableau.com/views/YourWorkbook/YourSheet"
  title="Chart Title"
  height={600}
/>
```

Requires the Tableau JS API script in `public/index.html`:
```html
<script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script>
```

Use the `useTableau` hook to check if the API is loaded before rendering.

---

## Data

- **Source**: Seattle Police Department Crime Data, 2008–Present (City of Seattle Open Data Portal)
- **Cleaned dataset**: `SPD_Crime_Data_2008_2025_clean_no1201.csv` — 610,461 records, 2017–2025
- **Cleaning**: See `dataclean.ipynb` — removes placeholder times (12:01:00), pre-2016 low-coverage rows, invalid block/neighborhood entries

---

## Getting Started

**Prerequisites**: conda environment `HCDE511` with Node.js

```bash
conda activate HCDE511
cd website
npm install
npm start       # dev server at http://localhost:3000
npm run build   # production build
```

**Export charts from notebook** (run after any data update):

Open `datavis.ipynb` and run the two export cells (labeled `# ── Export`) to regenerate `website/public/crime_hourly_chart.json` and `website/public/crime_bubble_chart.json`.
