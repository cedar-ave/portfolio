import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from '@site/src/pages/index.module.css';
import clsx from 'clsx';
import Data from '@site/data/Contact.json';
import ContactList from '@site/src/components/Contact/List';
export default function Contact() {
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
            <div className={clsx('col col--4 p-3')}>
              <ContactList />
            </div>
            <div className={clsx('col col--5 p-3')}>
              <img src={Data.image} alt={Data.title} />
            </div>
            <div className={clsx('col col--3 p-3')}>
              <h3>Leave a message</h3>
              <form action={Data.form_spree_id} method="POST">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                ></input>
                <br />
                <input
                  type="text"
                  name="whatsapp / phone"
                  placeholder="Enter Phone / Whatsapp"
                ></input>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                ></input>
                <br />
                <textarea
                  name="message"
                  placeholder="Enter your message"
                ></textarea>
                <br />
                <button class="button button--secondary button-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
