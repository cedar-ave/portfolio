import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Icon } from '@iconify/react';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// The tagline in docusaurus.config.js is a plain string (it also feeds page
// metadata), so it can't contain real JSX. It supports two inline markers -
// "</br>" for a line break and `<IIcon icon="..." height=".." />` for an
// Iconify icon - which this turns into actual React elements for display.
// Keep this in sync with any new markers added to the tagline string.
function renderTagline(tagline) {
  const markerPattern = /<\/br>|<IIcon icon="([^"]+)"(?: height="([^"]+)")?\s*\/>/g;
  const nodes = [];
  let lastIndex = 0;
  let key = 0;
  let match;
  while ((match = markerPattern.exec(tagline)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(tagline.slice(lastIndex, match.index));
    }
    if (match[0] === '</br>') {
      nodes.push(<br key={key++} />);
    } else {
      nodes.push(
        <Icon
          key={key++}
          icon={match[1]}
          height={match[2]}
          style={{ verticalAlign: '-0.15em', margin: '0 0.2em' }}
        />
      );
    }
    lastIndex = markerPattern.lastIndex;
  }
  if (lastIndex < tagline.length) {
    nodes.push(tagline.slice(lastIndex));
  }
  return nodes;
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroImage}>
          <div className={styles.heroImageFrame}>
            <img src="/img/headshot-circle.png" alt="Marla Sowards" className={styles.heroImageImg} />
          </div>
        </div>
        <div className={styles.heroText}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">
            {renderTagline(siteConfig.tagline)}
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/resume">
              Resume
            </Link>
            <Link className="button button--secondary button--lg" to="/portfolio">
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="AI-fluent documentation engineer">
      <HomepageHeader />
      <main>
        <section className={styles.textSection}>
          {/* <div className="container">
            <p>I create high quality, accurate content and deliver it consumers the moment they need it. I help:</p>
            <ul>
              <li><span class="semibold">End users</span> adopt products faster and meet their goals with ease and confidence</li>
              <li><span class="semibold">Team members</span> in engineering, customer success, sales, operations, and support access the information they need to serve customers excellently</li>
            </ul>
            <h3>How I can help you</h3>
            <ul>
              <li>Thoughtfully developing product enablement strategically content that </li>
              <li>Leveraging AI to generate and update content with the right balance of human-in-the-loop protections</li>
              <li>Designing systems that scale content operations across the company with minimal cost and resources</li>
              <li>Building delivery pipelines that not only publish content but check if content is right</li>
              <li>listening to executive priorities, stakeholders, and useres</li>
            </ul>
          </div> */}
        </section>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout >
  );
}
