import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section className={styles.textSection}>
          {/* <div className="container">
            <p>I create high quality, accurate content and deliver it consumers the moment they need it. I help:</p>
            <ul>
              <li><span class="roboto-semibold">End users</span> adopt products faster and meet their goals with ease and confidence</li>
              <li><span class="roboto-semibold">Team members</span> in engineering, customer success, sales, operations, and support access the information they need to serve customers excellently</li>
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
        <HomepageFeatures />
      </main>
    </Layout >
  );
}
