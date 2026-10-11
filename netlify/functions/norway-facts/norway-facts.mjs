// Netlify Function behind the Norway Facts API sample. The reference page
// at /api-reference (rendered by @scalar/docusaurus from
// static/openapi/norway-facts.yaml) sends its "Try it" requests here, and
// the generated code samples point here too, so they return real responses.
//
// Keep this file and the OpenAPI spec in sync: every route, parameter,
// status code, and response shape below is documented there.

import { categories, counties, facts } from './data.mjs';

const BASE_PATH = '/api/norway-facts';
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

// Read-only public data, so any origin may call it. This also lets the
// reference page's "Try it" panel work from deploy previews and localhost.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS },
  });

// Errors use RFC 9457 problem details.
const problem = (status, title, detail) =>
  new Response(JSON.stringify({ type: 'about:blank', title, status, detail }, null, 2), {
    status,
    headers: { 'Content-Type': 'application/problem+json; charset=utf-8', ...CORS_HEADERS },
  });

const categoryIds = categories.map((c) => c.id);

// Returns the validated category filter, null when absent, or a problem
// Response when the value isn't a known category.
function parseCategory(params) {
  const category = params.get('category');
  if (category === null) return null;
  if (!categoryIds.includes(category)) {
    return problem(400, 'Invalid parameter', `category must be one of: ${categoryIds.join(', ')}.`);
  }
  return category;
}

function parseInteger(params, name, fallback, min, max) {
  const raw = params.get(name);
  if (raw === null) return fallback;
  const value = Number(raw);
  if (!/^\d+$/.test(raw) || value < min || value > max) {
    return problem(400, 'Invalid parameter', `${name} must be an integer from ${min} to ${max}.`);
  }
  return value;
}

function listFacts(params) {
  const category = parseCategory(params);
  if (category instanceof Response) return category;
  const limit = parseInteger(params, 'limit', DEFAULT_LIMIT, 1, MAX_LIMIT);
  if (limit instanceof Response) return limit;
  const offset = parseInteger(params, 'offset', 0, 0, Number.MAX_SAFE_INTEGER);
  if (offset instanceof Response) return offset;

  const matches = category ? facts.filter((f) => f.category === category) : facts;
  return json({
    data: matches.slice(offset, offset + limit),
    pagination: { total: matches.length, limit, offset },
  });
}

function randomFact(params) {
  const category = parseCategory(params);
  if (category instanceof Response) return category;
  const pool = category ? facts.filter((f) => f.category === category) : facts;
  return json(pool[Math.floor(Math.random() * pool.length)]);
}

function getFact(rawId) {
  const fact = /^\d+$/.test(rawId) && facts.find((f) => f.id === Number(rawId));
  return fact ? json(fact) : problem(404, 'Not found', `No fact has the ID ${rawId}.`);
}

function getCounty(code) {
  const county = counties.find((c) => c.code === code);
  return county ? json(county) : problem(404, 'Not found', `No county has the code ${code}.`);
}

export default async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== 'GET') {
    const res = problem(405, 'Method not allowed', 'This API is read-only. Use GET.');
    res.headers.set('Allow', 'GET, OPTIONS');
    return res;
  }

  const url = new URL(req.url);
  const segments = url.pathname.slice(BASE_PATH.length).split('/').filter(Boolean).map(decodeURIComponent);
  const params = url.searchParams;

  switch (segments.length === 0 ? '' : segments[0]) {
    case 'facts':
      if (segments.length === 1) return listFacts(params);
      if (segments.length === 2) return segments[1] === 'random' ? randomFact(params) : getFact(segments[1]);
      break;
    case 'categories':
      if (segments.length === 1) return json({ data: categories });
      break;
    case 'counties':
      if (segments.length === 1) return json({ data: counties });
      if (segments.length === 2) return getCounty(segments[1]);
      break;
  }
  return problem(404, 'Not found', `No endpoint matches ${url.pathname}.`);
};

export const config = {
  path: [BASE_PATH, `${BASE_PATH}/*`],
};
