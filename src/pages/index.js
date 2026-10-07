import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Icon } from '@iconify/react';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// Tagline icons are either custom images under static/ (a path starting with
// "/") or Iconify "set:name" ids.
function TaglineIcon({ icon, className }) {
  const src = useBaseUrl(icon);
  if (icon.startsWith('/')) {
    return <img src={src} alt="" aria-hidden="true" className={clsx(className, styles.taglineImage)} />;
  }
  return <Icon icon={icon} height="3em" className={className} />;
}

// The tagline lines live in docusaurus.config.js as customFields.taglineItems
// ({ icon, text } objects). siteConfig.tagline is a plain-text join of the same
// items, used only for page metadata.
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
          <ul className={clsx('hero__subtitle', styles.taglineList)}>
            {siteConfig.customFields.taglineItems.map(({ icon, text, iconClass }) => (
              <li key={text} className={styles.taglineItem}>
                <TaglineIcon
                  icon={icon}
                  className={clsx(styles.taglineIcon, iconClass && styles[iconClass])}
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
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
