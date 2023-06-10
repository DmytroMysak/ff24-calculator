import type { Metric } from 'web-vitals';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

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
  try {
    getCLS(sendToVercelAnalytics);
    getFID(sendToVercelAnalytics);
    getFCP(sendToVercelAnalytics);
    getLCP(sendToVercelAnalytics);
    getTTFB(sendToVercelAnalytics);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[Analytics]', e);
  }
};
