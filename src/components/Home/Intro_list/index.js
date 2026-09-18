import clsx from 'clsx';
import Data from '@site/data/Home.json';
function Feature_list({ title, icon, content }) {
  return (
    <div className={clsx('col col--4 p-3 center')}>
      <div className="card p-3">
        <img className="icon" src={icon} alt={title} />
        <p>{title}</p>
        <p className="small">{content}</p>
      </div>
    </div>
  );
}

export default function List_Features() {
  return (
    <div className="container">
      <div className="row">
        {Data.feature_list.map((props, idx) => (
          <Feature_list key={idx} {...props} />
        ))}
      </div>
    </div>
  );
}
