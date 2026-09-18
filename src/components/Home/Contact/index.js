import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Data from '@site/data/Home.json';
export default function Contact() {
  return (
    <div className="container mt-5">
      <div className="row center mt-5">
        <div className={clsx('col col--2')}></div>
        <div className={clsx('col col--8 p-5')}>
          <h3 className="intro_title">
            <strong>
              <a href={Data.url} title={Data.description}>
                {Data.contact.title}
              </a>
            </strong>
          </h3>
          <p>{Data.contact.description}</p>
          <p>
            <Link
              className="button button--secondary button--lg"
              to={Data.contact.link}
              title={Data.contact.button}
            >
              {Data.contact.button}
            </Link>
          </p>
        </div>
        <div className={clsx('col col--2')}></div>
      </div>
    </div>
  );
}
