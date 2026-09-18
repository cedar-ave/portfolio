import clsx from 'clsx';
import Data from '@site/data/Home.json';
import styles from './styles.module.css';
function Section_list({ text }) {
  return (
    <div className={clsx('col col--6')}>
      <img src="img/check.svg" alt={text} className={styles.iconsia} />
      <span className="p-3">{text}</span>
    </div>
  );
}

export default function List_Features() {
  return (
    <div className="row">
      {Data.section.list.map((props, idx) => (
        <Section_list key={idx} {...props} />
      ))}
    </div>
  );
}
