import clsx from 'clsx';
import Data from '@site/data/Home.json';
import Section_list from '@site/src/components/Home/Section_list';
export default function Section() {
  return (
    <div className="container">
      <div className="row center mt-5">
        <div className={clsx('col col--2')}></div>
        <div className={clsx('col col--8 p-5')}>
          <h3 className="intro_title">
            <strong>
              <a href={Data.url} title={Data.section.description}>
                {Data.section.title}
              </a>
            </strong>
          </h3>
          <p>{Data.section.description}</p>
        </div>
        <div className={clsx('col col--1')}></div>
      </div>
      <div className="row">
        <div className={clsx('col col--6')}>
          <img
            className="shadow"
            src={Data.section.image}
            alt={Data.section.description}
            loading="lazy"
          />
        </div>
        <div className={clsx('col col--6 p-5')}>
          <h3>{Data.section.intro}</h3>
          <p>{Data.section.intro_text}</p>
          <Section_list />
        </div>
      </div>
    </div>
  );
}
