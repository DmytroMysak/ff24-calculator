/* eslint-disable no-console */
import type { Metric } from 'web-vitals';

const VITALS_URL = 'https://vitals.vercel-analytics.com/v1/vitals';

function sendToVercelAnalytics(metric: Metric): void {
  const analyticsId = process.env.VERCEL_ANALYTICS_ID;
  if (!analyticsId) {
    return;
  }

  const body = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: (navigator as any)?.connection?.effectiveType ?? '',
  };

  const blob = new Blob([new URLSearchParams(body).toString()], { type: 'application/x-www-form-urlencoded' });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(VITALS_URL, blob);
  } else {
    fetch(VITALS_URL, { body: blob, method: 'POST', credentials: 'omit', keepalive: true });
  }
}

export const reportWebVitals = (): void => {
  import('web-vitals')
    .then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      console.info('[Analytics loaded]');
      onCLS(sendToVercelAnalytics);
      onFID(sendToVercelAnalytics);
      onFCP(sendToVercelAnalytics);
      onLCP(sendToVercelAnalytics);
      onTTFB(sendToVercelAnalytics);
    })
    .catch((err) => console.error('[Analytics]', err));
};
