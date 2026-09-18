import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from '@site/src/pages/index.module.css';
import Data from '@site/data/Home.json';
import Link from '@docusaurus/Link';
export default function Header() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--6 p-3 mt-5')}>
            <Heading as="h1" className="hero__title">
              <a href={Data.url} title={Data.title}>
                {Data.header.title}
              </a>
            </Heading>
            <h2 className="hero__subtitle">{Data.header.description}</h2>
            <p>{Data.header.intro_text}</p>
            <Link
              title={Data.header.button_1}
              className="button button--primary me-1 button--md"
              to={Data.header.button_1_link}
            >
              {Data.header.button_1}
            </Link>
            <Link
              title={Data.header.button_2}
              className="button button--secondary me-1 button--md"
              to={Data.header.button_2_link}
            >
              {Data.header.button_2}
            </Link>
          </div>
          <div className={clsx('col col--6')}>
            <img
              className="imgs shadow"
              src={Data.header.image}
              alt={Data.header.intro_text}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
