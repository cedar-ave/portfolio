import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Data from '@site/data/Home.json';
import Basic from '@site/src/components/Home/Plan/Basic';
import Standard from '@site/src/components/Home/Plan/Standard';
import Pro from '@site/src/components/Home/Plan/Pro';
export default function Plan() {
  return (
    <div className="container">
      <div className="row center mt-5">
        <div className={clsx('col col--2')}></div>
        <div className={clsx('col col--8 p-5')}>
          <h3 className="intro_title">
            <strong>
              <a href={Data.url} title={Data.title}>
                {Data.plan.title}
              </a>
            </strong>
          </h3>
          <p>{Data.plan.description}</p>
        </div>
        <div className={clsx('col col--2')}></div>
      </div>
      <div className="row">
        <div className={clsx('col col--4 p-1')}>
          <div className="card p-3">
            <img
              className="icons"
              src={Data.basic_plan.icon}
              alt={Data.basic_plan.title}
            />
            <h3 className="card__header center">{Data.basic_plan.title}</h3>
            <h4 className="center">
              {Data.basic_plan.currency}
              {Data.basic_plan.price}
            </h4>
            <div className="card__body">
              <Basic />
            </div>
            <p className="center">
              <Link
                className="button button--primary button--md"
                to={Data.basic_plan.link}
                title={Data.basic_plan.title}
              >
                Order {Data.basic_plan.title}
              </Link>
            </p>
          </div>
        </div>
        <div className={clsx('col col--4 p-1 mt-5')}>
          <div className="card p-3 blus">
            <img
              className="icons"
              src={Data.standard_plan.icon}
              alt={Data.standard_plan.title}
            />
            <h3 className="card__header center">{Data.standard_plan.title}</h3>
            <h4 className="center">
              {Data.standard_plan.currency}
              {Data.standard_plan.price}
            </h4>
            <div className="card__body">
              <Standard />
            </div>
            <p className="center">
              <Link
                className="button button--secondary button--md"
                to={Data.standard_plan.link}
                title={Data.standard_plan.title}
              >
                Order {Data.standard_plan.title}
              </Link>
            </p>
          </div>
        </div>
        <div className={clsx('col col--4 p-1')}>
          <div className="card p-3">
            <img
              className="icons"
              src={Data.pro_plan.icon}
              alt={Data.pro_plan.title}
            />
            <h3 className="card__header center">{Data.pro_plan.title}</h3>
            <h4 className="center">
              {Data.pro_plan.currency}
              {Data.pro_plan.price}
            </h4>
            <div className="card__body">
              <Pro />
            </div>
            <p className="center">
              <Link
                className="button button--primary button--md"
                to={Data.pro_plan.link}
                title={Data.pro_plan.title}
              >
                Order {Data.pro_plan.title}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
