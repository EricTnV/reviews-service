/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const CounterErrors = new Counter('Errors');

export const options = {
  thresholds: {
    RTT: ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
    'Content OK': ['rate>0.95'],
  },
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '1m30s', target: 500 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const random = Math.floor(Math.random() * 10000000);
  const path = `http://127.0.0.1:3002/?propertyId=${random}`;
  const res = http.get(path, { tags: { name: 'PostsItemURL' } });
  const contentOK = res.status === 200;
  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  CounterErrors.add(!contentOK);
  sleep(1);
}
