import clsx from 'clsx';
import Data from '@site/data/Product.json';
import styles from './styles.module.css';
function Product_list({ image, title, content }) {
  return (
    <div className={clsx('col col--4 p-3')}>
      <img src={image} alt={title} className={styles.imagesa} />
      <h3 className="mt-3">{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default function List_Features() {
  return (
    <div className="row">
      {Data.product_list.map((props, idx) => (
        <Product_list key={idx} {...props} />
      ))}
    </div>
  );
}
