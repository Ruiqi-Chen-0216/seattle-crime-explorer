import React, { useEffect, useRef, useState } from 'react';

const VegaChart = ({ specUrl, title, description }) => {
  const chartRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const vegaViewRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    setStatus('loading');

    // Clean up previous view if any
    if (vegaViewRef.current) {
      vegaViewRef.current.finalize();
      vegaViewRef.current = null;
    }

    // Retry until window.vegaEmbed is available (scripts may still be loading)
    let cancelled = false;
    const fullSpecUrl = specUrl.startsWith('http')
      ? specUrl
      : process.env.PUBLIC_URL + specUrl;

    const tryEmbed = () => {
      if (cancelled) return;
      if (!window.vegaEmbed) {
        setTimeout(tryEmbed, 100);
        return;
      }
      fetch(fullSpecUrl)
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then((spec) =>
          window.vegaEmbed(chartRef.current, spec, {
            actions: false,
            renderer: 'svg',
          })
        )
        .then((result) => {
          if (!cancelled) {
            vegaViewRef.current = result.view;
            setStatus('ready');
          }
        })
        .catch((err) => {
          if (!cancelled) {
            console.error('VegaChart error:', err);
            setStatus('error');
          }
        });
    };

    tryEmbed();

    return () => {
      cancelled = true;
      if (vegaViewRef.current) {
        vegaViewRef.current.finalize();
        vegaViewRef.current = null;
      }
    };
  }, [specUrl]);

  return (
    <div className="bg-white rounded shadow-sm p-4 mb-8">
      {title && (
        <h3 className="text-base font-semibold text-gray-700 mb-1">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-3">{description}</p>
      )}
      {status === 'loading' && (
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
          Loading visualization...
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center justify-center h-24 text-red-400 text-sm">
          Could not load chart. Check the browser console for details.
        </div>
      )}
      <div
        ref={chartRef}
        className="w-full overflow-x-auto"
        style={{ display: status === 'ready' ? 'block' : 'none' }}
      />
    </div>
  );
};

export default VegaChart;
