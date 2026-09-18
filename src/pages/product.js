import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from '@site/src/pages/index.module.css';
import clsx from 'clsx';
import Data from '@site/data/Product.json';
import ProductList from '@site/src/components/Product/List';
export default function Product() {
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
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="container">
          <div class="row">
            <ProductList />
          </div>
        </div>
      </main>
    </Layout>
  );
}
