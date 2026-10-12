import { useEffect, useState } from 'react';
import styles from './styles.module.css';

// A live "fact of the day" from the Norway Data API, shown on the
// samples/norway-data-api-guides/fact-of-the-day page. The logic matches the
// fact-of-the-day.html page that guide walks through: get every fact by
// following the page links, then pick one from today's date. If you change
// one, change the other.
//
// It runs only in the browser (in useEffect), so the static build renders
// the loading state and the fact appears once the page loads.

const BASE_URL = 'https://api.marlasowards.com/norway-data/v1';

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    throw new Error(problem?.detail ?? `Request failed with status ${response.status}`);
  }
  return response.json();
}

async function getAllFacts() {
  const facts = [];
  let url = `${BASE_URL}/facts?limit=50`;
  while (url) {
    const page = await getJson(url);
    facts.push(...page.data);
    url = page.pagination.links.next;
  }
  return facts;
}

function factForDate(facts, date) {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return facts[day % facts.length];
}

export default function FactOfTheDay() {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    const today = new Date();
    (async () => {
      try {
        const fact = factForDate(await getAllFacts(), today);
        const places = await Promise.all(
          fact.placeIds.map((id) => getJson(`${BASE_URL}/places/${encodeURIComponent(id)}`)),
        );
        if (!cancelled) setState({ status: 'done', today, fact, places });
      } catch (error) {
        if (!cancelled) setState({ status: 'error', message: error.message });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.card} aria-live="polite">
      {state.status === 'loading' && <p className={styles.heading}>Loading today's fact…</p>}
      {state.status === 'error' && (
        <>
          <p className={styles.heading}>Couldn't load today's fact</p>
          <p className={styles.text}>{state.message}</p>
        </>
      )}
      {state.status === 'done' && (
        <>
          <p className={styles.date}>
            {state.today.toLocaleDateString('en', { dateStyle: 'long' })} · Fact {state.fact.id} · {state.fact.category}
          </p>
          <p className={styles.heading}>{state.fact.title}</p>
          <p className={styles.text}>{state.fact.text}</p>
          {state.places.length > 0 && (
            <ul className={styles.places}>
              {state.places.map((place) => (
                <li key={place.id}>
                  <strong>{place.name}:</strong> {place.description}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
