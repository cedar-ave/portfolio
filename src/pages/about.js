import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from '@site/src/pages/index.module.css';
import clsx from 'clsx';
import Data from '@site/data/About.json';
export default function About() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={Data.title} description={Data.description}>
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx('col col--1')}></div>
            <div className={clsx('col col--10 p-3 center')}>
              <Heading as="h1" className="hero__title">
                <a href={Data.url} title={Data.title}>
                  {Data.header.title}
                </a>
              </Heading>
              <h2 className="hero__subtitle">{Data.header.description}</h2>
              <img
                className="mt-5 shadow"
                src={Data.header.image}
                title={Data.header.description}
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="container">
          <div class="row">
            <div className={clsx('col col--2')}></div>
            <div className={clsx('col col--8 p-5')}>
              <h3>{Data.intro.title}</h3>
              <p>{Data.intro.description}</p>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div className={clsx('col col--6 p-3')}>
              <img
                className="shadow"
                src={Data.section_1.image}
                title={Data.section_1.title}
                loading="lazy"
              />
            </div>
            <div className={clsx('col col--6 p-5')}>
              <h3>{Data.section_1.title}</h3>
              <p>{Data.section_1.description}</p>
            </div>
            <div className={clsx('col col--6 p-5')}>
              <h3>{Data.section_2.title}</h3>
              <p>{Data.section_2.description}</p>
            </div>
            <div className={clsx('col col--6 p-3')}>
              <img
                className="shadow"
                src={Data.section_2.image}
                title={Data.section_2.title}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div className={clsx('col col--1')}></div>
            <div className={clsx('col col--10 p-5')}>
              <h3>{Data.section_3.title}</h3>
              <p>{Data.section_3.description}</p>
              <img
                className="shadow"
                src={Data.section_3.image}
                title={Data.section_3.title}
                loading="lazy"
              />
              <p>{Data.section_3.text}</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
