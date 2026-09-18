import clsx from 'clsx';
import Data from '@site/data/Home.json';
export default function Intro() {
  return (
    <div className="container">
      <div className="row center">
        <div className={clsx('col col--2')}></div>
        <div className={clsx('col col--8 p-5')}>
          <h3 className="intro_title">
            <strong>
              <a href={Data.url} title={Data.features.description}>
                {Data.features.title}
              </a>
            </strong>
          </h3>
          <p>{Data.features.description}</p>
        </div>
        <div className={clsx('col col--2')}></div>
      </div>
    </div>
  );
}
