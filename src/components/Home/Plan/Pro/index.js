import Data from '@site/data/Home.json';
import styles from './styles.module.css';
function Pro_list({ text }) {
  return (
    <p>
      <img
        className="icon"
        src="img/check.svg"
        width="20"
        height="20"
        alt={text}
        className={styles.iconsia}
      />{' '}
      {text}
    </p>
  );
}

export default function List_Features() {
  return (
    <div>
      {Data.pro_plan.features.map((props, idx) => (
        <Pro_list key={idx} {...props} />
      ))}
    </div>
  );
}
