import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Header from '@site/src/components/Home/Header';
import Contact from '@site/src/components/Home/Contact';
import Intro from '@site/src/components/Home/Intro';
import IntroList from '@site/src/components/Home/Intro_list';
import Section from '@site/src/components/Home/Section';
import Pricing from '@site/src/components/Home/Plan';
import Data from '@site/data/Home.json';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={Data.title} description={Data.description}>
      <Header />
      <main>
        <Intro />
        <IntroList />
        <Section />
        <Pricing />
        <Contact />
      </main>
    </Layout>
  );
}
